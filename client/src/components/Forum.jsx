import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { config } from "../URLs.jsx";
import Post from "./Post";
import Comment from "./comment";
import LoginModal from "./LoginModal";
import PostModal from "./PostModal";
import ReplyModal from "./ReplyModal";
import NewUserModal from "./NewUserModal";
import TopMobileNavBar from "./TopMobileNavBar";
import ForumMobileNav from "./ForumMobileNav";
import Pagination from "./Pagination";
import ForumDesktopNav from "./ForumDesktopNav";
import SinglePost from "./SinglePost";

class Forum extends React.Component {
  state = {
    entries: [],
    viewedEntry: {},
    viewedComment: false,
    entriesDisplayed: false,
    comments: [],
    width: window.innerWidth,
    isViewingComments: false,
    dbWasContacted: false,
    postModalOpen: false,
    userModalOpen: false,
    loginModalOpen: false,
    replyModalOpen: false,
    user: null,
    createModalError: "",
    postTitle: "",
    postBody: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    replyText: "",
    currentPage: 1,
    pageSize: 2,
    numberOfPages: 0,
  };

  async componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
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
  }

  updateEntriesFromDatabase = async () => {
    try {
      const { data: entries } = await axios.get(config + "/api/posts");
      console.log("updateEntriesFromDatabase called");
      this.chunkifyEntries(entries);
      this.setState({ isViewingComments: false });
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
    this.setState({ currentPage: 1 });
  };

  displayPostsSortedByNew = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(b.timePosted) - new Date(a.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
    this.setState({ currentPage: 1 });
  };

  displayPostsSortedByOld = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(a.timePosted) - new Date(b.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
    this.setState({ currentPage: 1 });
  };

  displayPostsSortedByPopular = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
    this.chunkifyEntries(sortedEntries);
    this.setState({ currentPage: 1 });
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

  handlePostTitleChange = (e) => this.setState({ postTitle: e.target.value });
  handlePostBodyChange = (e) => this.setState({ postBody: e.target.value });

  handleUserEmailChange = (e) => this.setState({ userEmail: e.target.value });
  handleUserPasswordChange = (e) =>
    this.setState({ userPassword: e.target.value });
  handleUserNameChange = (e) => this.setState({ userName: e.target.value });

  resetStateFormInfoHolders = () => {
    this.setState({
      createModalError: "",
      postTitle: "",
      postBody: "",
      userName: "",
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

  openReplyModal = (comment) => {
    window.addEventListener("click", this.handleClickOutsideReplyModal);
    if (comment) this.setState({ viewedComment: comment });
    this.setState({ replyModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closeReplyModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReplyModal);
    this.setState({ viewedComment: false });
    this.setState({ replyModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  handleClickOutsideReplyModal = (event) => {
    const container = document.getElementById("reply-modal-content");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      event.target.className !== "open-reply-button"
    ) {
      console.log("clicked outside reply modal");
      this.closeReplyModal();
    } else {
      console.log("clicked inside reply modal");
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

  onSubmitPost = async () => {
    const { postTitle, postBody } = this.state;
    const postObj = {
      title: postTitle,
      body: postBody,
      timePosted: new Date(),
      username: [this.state.user, this.state.user.name],
      likes: [{ ...this.state.user }],
    };
    try {
      const response = await axios.post(config + "/api/posts", postObj);
      console.log(response);
      this.closePostModal();
      window.location = "/forum";
    } catch (error) {
      console.log(error);
      this.closePostModal();
    }
  };

  onCreateUser = async () => {
    const { userEmail, userPassword, userName } = this.state;
    const postObj = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    try {
      const response = await axios.post(config + "/api/users", postObj);
      console.log(response);
      this.closeUserModal();
      window.location = "/";
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
      window.location = "/forum";
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

  onDelete = async (id) => {
    try {
      const response = await axios.delete(config + "/api/posts", {
        data: { _id: id },
      });
      console.log(response);
      const entriesExceptDeleted = this.state.entries.filter(
        (entry) => entry._id !== id
      );
      this.setState({ entries: entriesExceptDeleted });
      this.updateEntriesFromDatabase();
    } catch (error) {
      console.log(error, "Couldn't delete");
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
    window.location = "/forum";
  };

  renderPostsInListGroup = () => {
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

  contactDatabaseUpdateStateWithComments = async (postID) => {
    try {
      this.setState({ isViewingComments: true });
      let entry = this.state.entries.filter((entry) => entry._id == postID);
      this.setState({ viewedEntry: entry[0] });
      let searchParam = { parentPost: `${postID}` };
      const { data: comments } = await axios.post(
        config + "/api/comments/get",
        searchParam
      );
      const hashTable = Object.create(null);
      comments.forEach((comment) => (hashTable[comment._id] = { ...comment }));
      const dataTree = [];
      comments.forEach((comment) => {
        if (comment.parentComment)
          hashTable[comment.parentComment].children.push(
            hashTable[comment._id]
          );
        else dataTree.push(hashTable[comment._id]);
        console.log(dataTree);
        this.setState({ comments: dataTree });
      });
    } catch (error) {
      console.log("catch block called", error);
    }
  };

  onChangeReplyModalText = (text) => {
    this.setState({ replyText: text });
    console.log(text);
  };

  updateCurrentPage = (newPage) => {
    console.log(newPage);
    this.setState({ currentPage: newPage });
  };

  incrementPage = (num) => {
    this.setState({ currentPage: num });
  };

  render() {
    const { currentPage, entries, entriesDisplayed, pageSize } = this.state;

    return (
      <div>
        <TopMobileNavBar page="forum" />

        <h1>{this.serverStatus()}</h1>
        <button onClick={() => console.log(this.state)}>
          console.log state
        </button>
        {this.state.postModalOpen ? (
          <PostModal
            closePostModal={this.closePostModal}
            isOpen={this.state.postModalOpen}
            value={this.state.postModalOpen}
            updateView={this.updateEntriesFromDatabase}
            onSubmit={this.onSubmitPost}
            onTitleChange={this.handlePostTitleChange}
            onBodyChange={this.handlePostBodyChange}
          />
        ) : null}
        {this.state.userModalOpen ? (
          <NewUserModal
            closeUserModal={this.closeUserModal}
            isOpen={this.state.userModalOpen}
            value={this.state.userModalOpen}
            updateView={this.updateEntriesFromDatabase}
            onSubmit={this.onCreateUser}
            onNameChange={this.handleUserNameChange}
            onEmailChange={this.handleUserEmailChange}
            onPasswordChange={this.handleUserPasswordChange}
            error={this.state.createModalError}
          />
        ) : null}
        {this.state.loginModalOpen ? (
          <LoginModal
            closeLoginModal={this.closeLoginModal}
            isOpen={this.state.loginModalOpen}
            value={this.state.loginModalOpen}
            onEmailChange={this.handleUserEmailChange}
            onPasswordChange={this.handleUserPasswordChange}
            onSubmit={this.onLogin}
            error={this.state.createModalError}
          />
        ) : null}

        <ReplyModal
          closeModal={this.closeReplyModal}
          isOpen={this.state.replyModalOpen}
          comment={this.state.viewedComment}
          post={this.state.viewedEntry}
        />

        <div
          className={
            this.state.width < 800 ? "formum-main" : "forum-main-large"
          }
        >
          {this.state.width > 800 && (
            <div className="desktop-menu-column">
              <ForumDesktopNav
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
              <Pagination
                currentPage={Number(currentPage)}
                totalCount={Number(this.state.numberOfPages)}
                siblingCount={1}
                pageSize={pageSize}
                updateCurrentPage={this.updateCurrentPage}
                incrementPage={this.incrementPage}
              />
            </div>
          )}

          <div className="posts-div">
            {this.state.entriesDisplayed &&
              !this.state.isViewingComments &&
              this.renderPostsInListGroup()}
            {this.state.isViewingComments && (
              <SinglePost
                post={this.state.viewedEntry}
                openReplyModal={this.openReplyModal}
                comments={this.state.comments}
              />
            )}
          </div>
          {this.state.width < 800 && (
            <div className="bottom-pagination-div">
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
              <Pagination
                currentPage={Number(currentPage)}
                totalCount={Number(this.state.numberOfPages)}
                siblingCount={1}
                pageSize={pageSize}
                updateCurrentPage={this.updateCurrentPage}
                incrementPage={this.incrementPage}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Forum;
