import React from "react";
import axios from "axios";
import { config } from "../../URLs.jsx";
import jwtDecode from "jwt-decode";
import Post from "./Post";
import PostModal from "../Modals/PostModal";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import ForumMobileNav from "../Navs/MobileNav";
import Pagination from "../Utilities/Pagination";
import ForumDesktopNav from "../Navs/DesktopNav";
import LogInOrCreate from "../Login/LoginOrCreate";
import logo from "../../images/logo.png";
import styles from "./Forum.module.css";

class Forum extends React.Component {
  state = {
    entries: [],
    entriesDisplayed: false,
    comments: [],
    width: window.innerWidth,
    dbWasContacted: false,
    postModalOpen: false,
    user: null,
    createModalError: "",
    currentPage: this.props.page,
    sort: this.props.sort,
    pageSize: 5,
    numberOfPages: 0,
    navOpen: false,
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
      document.body.style.overflow = "hidden";
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  isAdmin = () => {
    return this.state.user.isAdmin ? true : false;
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      window.location.reload();
      window.scrollTo(0, 0);
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
    window.addEventListener("mousedown", this.handleClickOutsidePostModal);
    this.setState({ postModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closePostModal = () => {
    window.removeEventListener("mousedown", this.handleClickOutsidePostModal);
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

  navOpen = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  year = () => {
    let date = new Date();
    return date.getFullYear().toString();
  };

  render() {
    const { currentPage, pageSize } = this.state;

    return (
      <div className={styles.wrapper}>
        <TopMobileNavBar page="forum" />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <header></header>
        <PostModal
          closePostModal={this.closePostModal}
          isOpen={this.state.postModalOpen}
          value={this.state.postModalOpen}
          updateView={this.updateEntriesFromDatabase}
          width={this.state.width}
          user={this.state.user}
        />

        <div
          className={this.state.width < 800 ? styles.main : styles.mainLarge}
          id={this.userLoggedIn() ? null : styles.loginLanding}
        >
          {this.state.width > 800 && this.userLoggedIn() && (
            <ForumDesktopNav
              openPostModal={this.openPostModal}
              openUserModal={this.openUserModal}
              sortByNew={this.displayPostsSortedByNew}
              sortByOld={this.displayPostsSortedByOld}
              logOut={this.logOut}
              userLoggedIn={this.userLoggedIn}
              user={this.state.user}
              sortMyPosts={this.displayMyPosts}
              sortPopular={this.displayPostsSortedByPopular}
              updateView={this.updateEntriesFromDatabase}
              sort={this.props.sort}
              status={this.serverStatus}
            />
          )}
          {!this.userLoggedIn() && <LogInOrCreate />}
          {!this.userLoggedIn() && this.state.width > 800 && (
            <React.Fragment>
              <div className={styles.pleaseLogin}>
                <img alt="Barker-Field Logo" src={logo}></img>
              </div>
            </React.Fragment>
          )}
          {this.state.user && (
            <div className={styles.postsDiv}>
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
          )}
          {this.userLoggedIn() && this.state.width < 800 && (
            <div className={styles.mobileNav}>
              <ForumMobileNav
                openPostModal={this.openPostModal}
                openUserModal={this.openUserModal}
                sortByNew={this.displayPostsSortedByNew}
                sortByOld={this.displayPostsSortedByOld}
                logOut={this.logOut}
                userLoggedIn={this.userLoggedIn}
                sortMyPosts={this.displayMyPosts}
                sortPopular={this.displayPostsSortedByPopular}
                updateView={this.updateEntriesFromDatabase}
                navOpen={this.navOpen}
                sort={this.props.sort}
              />
            </div>
          )}
        </div>
        <footer>
          <small>© {this.year()} Barker Field Dog Park</small>
        </footer>
      </div>
    );
  }
}

export default Forum;
