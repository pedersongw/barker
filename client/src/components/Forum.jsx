import React from "react";
import axios from "axios";
import { config } from "../URLs.jsx";
import jwtDecode from "jwt-decode";
import Post from "./Post";
import LoginModal from "./LoginModal";
import PostModal from "./PostModal";
import NewUserModal from "./NewUserModal";
import TopMobileNavBar from "./TopMobileNavBar";
import ForumMobileNav from "./ForumMobileNav";
import Pagination from "./Pagination";
import ForumDesktopNav from "./ForumDesktopNav";

class Forum extends React.Component {
  state = {
    entries: [],
    entriesDisplayed: false,
    comments: [],
    width: window.innerWidth,
    dbWasContacted: false,
    postModalOpen: false,
    userModalOpen: false,
    loginModalOpen: false,
    replyModalOpen: false,
    user: null,
    createModalError: "",
    currentPage: this.props.page,
    sort: this.props.sort,
    pageSize: 5,
    numberOfPages: 0,
  };

  async componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    const { sort } = this.props;
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user: user });
    } catch (ex) {
      this.setState({ user: null });
    }
    try {
      const { data: entries } = await axios.get(config + "/api/posts");
      if (entries.length > 0) {
        this.chunkifyEntries(entries);
        this.setState({ entries });
        this.setState({ dbWasContacted: true });
        console.log("state populated from objects in the database");
      } else if (entries.length === 0) {
        this.setState({ dbWasContacted: "empty" });
        console.log("Database empty");
      }
    } catch (error) {
      console.log("Couldn't reach the server", error);
    }
    if (sort === "all") {
      return;
    } else if (sort === "popular") {
      this.displayPostsSortedByPopular();
    } else if (sort === "my") {
      this.displayMyPosts();
    } else if (sort === "new") {
      this.displayPostsSortedByNew();
    } else if (sort === "old") {
      this.displayPostsSortedByOld();
    }
  }

  isAdmin = () => {
    return this.state.user.isAdmin ? true : false;
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      window.location.reload();
    }
  }

  updateEntriesFromDatabase = async () => {
    try {
      const { data: entries } = await axios.get(config + "/api/posts");
      console.log("updateEntriesFromDatabase called");
      this.chunkifyEntries(entries);
      this.setState({ comments: [] });
    } catch (error) {
      console.log("Couldn't reach the server", error);
    }
  };

  chunkifyEntries = (entries) => {
    let otherArr = [...entries];
    const res = [];
    while (otherArr.length > 0) {
      const chunk = otherArr.splice(0, this.state.pageSize);
      res.push(chunk);
    }
    let arrLength = res.reduce((acc, val) => acc.concat(val), []);
    console.log(res);
    this.setState({ numberOfPages: arrLength.length });
    this.setState({ entriesDisplayed: res });
  };

  displayMyPosts = () => {
    const unsorted = [...this.state.entries];
    const sorted = unsorted.filter(
      (entry) => entry.username[0]["_id"] === this.state.user["_id"]
    );
    this.chunkifyEntries(sorted);
  };

  displayPostsSortedByNew = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(b.timePosted) - new Date(a.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
  };

  displayPostsSortedByOld = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(a.timePosted) - new Date(b.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
  };

  displayPostsSortedByPopular = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
    this.chunkifyEntries(sortedEntries);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  userLoggedIn = () => {
    return this.state.user === null ? false : true;
  };

  resetStateFormInfoHolders = () => {
    this.setState({
      createModalError: "",
      postTitle: "",
      postBody: "",
      userEmail: "",
      userPassword: "",
    });
  };
  openPostModal = () => {
    window.addEventListener("click", this.handleClickOutsidePostModal);
    this.setState({ postModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closePostModal = () => {
    window.removeEventListener("click", this.handleClickOutsidePostModal);
    this.setState({ postModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  handleClickOutsidePostModal = (event) => {
    const container = document.getElementById("post-modal-content");
    const button = document.getElementById("create-post-button");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      button !== event.target
    ) {
      console.log("clicked outside post modal");
      this.closePostModal();
    }
  };

  openUserModal = () => {
    window.addEventListener("click", this.handleClickOutsideUserModal);
    this.setState({ userModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closeUserModal = () => {
    window.removeEventListener("click", this.handleClickOutsideUserModal);
    this.setState({ userModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  handleClickOutsideUserModal = (event) => {
    const container = document.getElementById("user-modal-content");
    const button = document.getElementById("create-new-user-button");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      button !== event.target
    ) {
      console.log("clicked outside user modal");
      this.closeUserModal();
    }
  };

  openLoginModal = () => {
    window.addEventListener("click", this.handleClickOutsideLoginModal);
    this.setState({ loginModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closeLoginModal = () => {
    window.removeEventListener("click", this.handleClickOutsideLoginModal);
    this.setState({ loginModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  handleClickOutsideLoginModal = (event) => {
    const container = document.getElementById("login-modal-content");
    const button = document.getElementById("login-button");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      button !== event.target
    ) {
      console.log("clicked outside login");
      this.closeLoginModal();
    }
  };

  onLogin = async () => {
    const { userEmail, userPassword } = this.state;
    const postObj = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await axios.post(config + "/api/auth", postObj);
      console.log(response);
      localStorage.setItem("token", response.data);
      this.closeLoginModal();
      window.location = "/forum/1/all";
    } catch (error) {
      console.log(
        error.response.status,
        error.response.data.details[0].message
      );
      this.setState({
        createModalError: error.response.data.details[0].message,
      });
    }
  };

  serverStatus = () => {
    const { dbWasContacted, user } = this.state;
    const firstPart = user === null ? "Please log in" : `Welcome ${user.name}`;
    const secondPart =
      dbWasContacted === "empty" ? ", the database is empty" : "";
    if (!dbWasContacted) {
      return "Couldn't reach server";
    } else {
      return firstPart + secondPart;
    }
  };

  onLike = async (id) => {
    const userID = this.state.user._id;
    const data = {
      _id: id,
      user: { ...this.state.user },
    };
    let post = this.state.entries.filter((entry) => entry._id === id);
    let isAlreadyLiked = false;
    for (let i = 0; i < post[0].likes.length; i++) {
      if (post[0].likes[i]["_id"] === userID) {
        isAlreadyLiked = true;
      }
    }
    console.log(isAlreadyLiked);

    if (!isAlreadyLiked) {
      try {
        console.log("like try block called");
        const response = await axios.put(config + "/api/posts/like", data);
        console.log(response);
        this.updateEntriesFromDatabase();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("unlike try block called");
        const response = await axios.put(config + "/api/posts/unlike", data);
        console.log(response);
        this.updateEntriesFromDatabase();
      } catch (error) {
        console.log(error);
      }
    }
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.setState({ user: null });
    window.location = "/forum/1/all";
  };

  renderPostsInListGroup = () => {
    if (this.state.entriesDisplayed.length < 1) {
      return <h2>Nothing to display</h2>;
    }
    return this.state.entriesDisplayed[this.state.currentPage - 1].map(
      (entry) => {
        return (
          <Post
            key={entry._id}
            id={entry._id}
            title={entry.title}
            body={entry.body}
            likes={entry.likes}
            timePosted={entry.timePosted}
            username={entry.username}
            onDelete={this.onDelete}
            onLike={this.onLike}
            userLoggedIn={Boolean(this.state.user)}
            onClick={this.contactDatabaseUpdateStateWithComments}
          />
        );
      }
    );
  };

  updateCurrentPage = (newPage) => {
    console.log(newPage);
    this.setState({ currentPage: newPage });
  };

  incrementPage = (num) => {
    this.setState({ currentPage: num });
  };

  render() {
    const { currentPage, pageSize } = this.state;

    return (
      <div>
        <TopMobileNavBar page="forum" />
        <div className="spacer-for-header"></div>
        <PostModal
          closePostModal={this.closePostModal}
          isOpen={this.state.postModalOpen}
          value={this.state.postModalOpen}
          updateView={this.updateEntriesFromDatabase}
          width={this.state.width}
          user={this.state.user}
        />

        <NewUserModal
          closeUserModal={this.closeUserModal}
          isOpen={this.state.userModalOpen}
          value={this.state.userModalOpen}
          updateView={this.updateEntriesFromDatabase}
          error={this.state.createModalError}
          width={this.state.width}
        />

        <LoginModal
          closeLoginModal={this.closeLoginModal}
          isOpen={this.state.loginModalOpen}
          value={this.state.loginModalOpen}
          onSubmit={this.onLogin}
          error={this.state.createModalError}
        />

        <div
          className={
            this.state.width < 800 ? "formum-main" : "forum-main-large"
          }
        >
          {this.state.width > 800 && (
            <ForumDesktopNav
              openPostModal={this.openPostModal}
              openUserModal={this.openUserModal}
              sortByNew={this.displayPostsSortedByNew}
              sortByOld={this.displayPostsSortedByOld}
              logIn={this.openLoginModal}
              logOut={this.logOut}
              userLoggedIn={this.userLoggedIn}
              user={this.state.user}
              sortMyPosts={this.displayMyPosts}
              sortPopular={this.displayPostsSortedByPopular}
              updateView={this.updateEntriesFromDatabase}
            />
          )}

          <div className="posts-div">
            {!this.state.user && this.serverStatus()}
            {this.state.entriesDisplayed &&
              this.state.user &&
              this.renderPostsInListGroup()}
            {this.state.user && (
              <Pagination
                currentPage={Number(currentPage)}
                totalCount={Number(this.state.numberOfPages)}
                siblingCount={1}
                pageSize={pageSize}
                updateCurrentPage={this.updateCurrentPage}
                incrementPage={this.incrementPage}
                sort={this.state.sort}
              />
            )}
          </div>
          {this.state.width < 800 && (
            <div className="forum-mobile-nav-div">
              <ForumMobileNav
                openPostModal={this.openPostModal}
                openUserModal={this.openUserModal}
                sortByNew={this.displayPostsSortedByNew}
                sortByOld={this.displayPostsSortedByOld}
                logIn={this.openLoginModal}
                logOut={this.logOut}
                userLoggedIn={this.userLoggedIn}
                sortMyPosts={this.displayMyPosts}
                sortPopular={this.displayPostsSortedByPopular}
                updateView={this.updateEntriesFromDatabase}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Forum;
