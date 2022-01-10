import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Container, Col, Row, Button } from "react-bootstrap";
import { config } from "../URLs.jsx";
import Post from "./Post";
import CreatePostModal from "./createPostModal";
import Comment from "./comment";
import CreateUserModal from "./createUserModal";
import CreateLoginModal from "./createLoginModal";
import BottomMobileNavBar from "./BottomMobileNavBar";
import ForumNavIcon from "./ForumNavIcon";
import Pagination from "./Pagination";

class Forum extends React.Component {
  state = {
    entries: [],
    entriesDisplayed: false,
    comments: [],
    width: window.innerWidth,
    isViewingComments: false,
    dbWasContacted: false,
    postModalOpen: false,
    userModalOpen: false,
    loginModalOpen: false,
    user: null,
    createModalError: "",
    postTitle: "",
    postBody: "",
    userName: "",
    userEmail: "",
    userPassword: "",
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
    this.setState({ postModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closePostModal = () => {
    this.setState({ postModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  openUserModal = () => {
    this.setState({ userModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closeUserModal = () => {
    this.setState({ userModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  openLoginModal = () => {
    this.setState({ loginModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closeLoginModal = () => {
    this.setState({ loginModalOpen: false });
    this.resetStateFormInfoHolders();
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
            onClick={this.contactDatabaseUpdateStateWithComments}
            userLoggedIn={Boolean(this.state.user)}
          />
        );
      }
    );
  };

  renderCommentsInListGroup = () => {
    return this.state.comments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  };

  contactDatabaseUpdateStateWithComments = async (postID) => {
    try {
      let searchParam = { parentPost: `${postID}` };
      const { data: comments } = await axios.post(
        "http://localhost:8000/api/comments/get",
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
        this.setState({ isViewingComments: true });
      });
    } catch (error) {
      console.log("catch block called", error);
    }
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
        <BottomMobileNavBar page="forum" />
        <ForumNavIcon
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
        <Container fluid>
          <Row>
            <Button
              onClick={() =>
                this.state.isViewingComments === false
                  ? this.setState({ isViewingComments: true })
                  : this.setState({ isViewingComments: false })
              }
            >
              Button
            </Button>
            <Button onClick={() => console.log("stuff")}>
              console.log this.state.entries
            </Button>

            <Col className="d-flex justify-content-between">
              <h1>{this.serverStatus()}</h1>
              {this.state.postModalOpen ? (
                <CreatePostModal
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
                <CreateUserModal
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
                <CreateLoginModal
                  closeLoginModal={this.closeLoginModal}
                  isOpen={this.state.loginModalOpen}
                  value={this.state.loginModalOpen}
                  onEmailChange={this.handleUserEmailChange}
                  onPasswordChange={this.handleUserPasswordChange}
                  onSubmit={this.onLogin}
                  error={this.state.createModalError}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={0}>
              <Pagination
                currentPage={Number(currentPage)}
                totalCount={Number(this.state.numberOfPages)}
                siblingCount={1}
                pageSize={pageSize}
                updateCurrentPage={this.updateCurrentPage}
                incrementPage={this.incrementPage}
              />
            </Col>
            <Col lg={9} sm={12}>
              {this.state.entriesDisplayed && this.renderPostsInListGroup()}
              {this.state.isViewingComments && this.renderCommentsInListGroup()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Forum;
