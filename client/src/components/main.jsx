import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Container, Col, Row, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaBullhorn, FaGift } from "react-icons/fa";
import ListGroupItem from "./listGroupItem";
import CreatePostModal from "./createPostModal";
import Comment from "./comment";
import CreateUserModal from "./createUserModal";
import CreateLoginModal from "./createLoginModal";
import NavBar from "./navBar";
import Forum from "./Forum";

class Main extends React.Component {
  state = {
    entries: [],
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
    highlighted_nav: 0,
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
      const { data: entries } = await axios.get(
        "http://localhost:3000/api/posts"
      );
      if (entries.length > 0) {
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
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        postObj
      );
      console.log(response);
      this.closePostModal();
      window.location = "/";
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
      const response = await axios.post(
        "http://localhost:3000/api/users",
        postObj
      );
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
      const response = await axios.post(
        "http://localhost:3000/api/auth",
        postObj
      );
      console.log(response);
      localStorage.setItem("token", response.data);
      this.closeLoginModal();
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

  updateView = async () => {
    try {
      const { data: entries } = await axios.get(
        "http://localhost:3000/api/posts"
      );
      this.setState({ entries });
      console.log("update view called");
      this.setState({ isViewingComments: false });
      this.setState({ comments: [] });
    } catch (error) {
      console.log("Couldn't reach to server", error);
    }
  };

  updateViewMyPosts = () => {
    const unsorted = [...this.state.entries];
    const sorted = unsorted.filter(
      (entry) => entry.username[0]["_id"] === this.state.user["_id"]
    );
    this.setState({ entries: sorted });
  };

  serverStatus = () => {
    const { dbWasContacted, user } = this.state;
    const firstPart = user === null ? "Please log in" : `Welcome ${user.name}`;
    const secondPart =
      dbWasContacted === "empty" ? ", the database is empty" : "";
    if (!dbWasContacted) {
      return "Couln't reach server";
    } else {
      return firstPart + secondPart;
    }
  };

  onDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:3000/api/posts", {
        data: { _id: id },
      });
      console.log(response);
      const entriesExceptDeleted = this.state.entries.filter(
        (entry) => entry._id !== id
      );
      this.setState({ entries: entriesExceptDeleted });
      this.updateView();
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
        const response = await axios.put(
          "http://localhost:3000/api/posts/like",
          data
        );
        console.log(response);
        this.updateView();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("unlike try block called");
        const response = await axios.put(
          "http://localhost:3000/api/posts/unlike",
          data
        );
        console.log(response);
        this.updateView();
      } catch (error) {
        console.log(error);
      }
    }
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.setState({ user: null });
    window.location = "/";
  };

  displayPostsSortedByNew = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(b.timePosted) - new Date(a.timePosted);
    });
    this.setState({ entries: sortedEntries });
  };

  displayPostsSortedByOld = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(a.timePosted) - new Date(b.timePosted);
    });
    this.setState({ entries: sortedEntries });
  };

  displayPostsSortedByPopular = () => {
    const sortedEntries = this.state.entries.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
    this.setState({ entries: sortedEntries });
  };

  renderPostsInListGroup = () => {
    return this.state.entries.map((entry) => {
      return (
        <ListGroupItem
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
    });
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

  render() {
    const { width, highlighted_nav } = this.state;
    let navStyle = "custom-navbar-button";
    return (
      <Container fluid>
        {width < 800 && (
          <div className="custom-navbar">
            <Link to="/">
              <div className="custom-navbar-button" id="nav-button-1">
                <div className="icon">
                  <FaHome />
                </div>
                <div>Home</div>
              </div>
            </Link>
            <Link to="/">
              <div
                className={
                  highlighted_nav === 2 ? (navStyle += "-active") : navStyle
                }
                onTouchStart={() => this.setState({ highlighted_nav: 2 })}
                onTouchEnd={() => this.setState({ highlighed_nav: 0 })}
                id="nav-button-2"
              >
                <div className="icon">
                  <FaBullhorn />
                </div>
                <div>Forum</div>
              </div>
            </Link>
            <Link to="/">
              <div className="custom-navbar-button" id="nav-button-3">
                <div className="icon">
                  <FaGift />
                </div>
                <div>Donate</div>
              </div>
            </Link>
          </div>
        )}
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
          <Button onClick={() => console.log(this.state.width)}>
            console.log this.state.width
          </Button>

          <Col className="d-flex justify-content-between">
            <h1>{this.serverStatus()}</h1>
            {this.state.postModalOpen ? (
              <CreatePostModal
                closePostModal={this.closePostModal}
                isOpen={this.state.postModalOpen}
                value={this.state.postModalOpen}
                updateView={this.updateView}
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
                updateView={this.updateView}
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
          <Col lg={2} sm={0}>
            <NavBar
              openPostModal={this.openPostModal}
              openUserModal={this.openUserModal}
              sortByNew={this.displayPostsSortedByNew}
              sortByOld={this.displayPostsSortedByOld}
              logIn={this.openLoginModal}
              logOut={this.logOut}
              userLoggedIn={this.userLoggedIn}
              sortMyPosts={this.updateViewMyPosts}
              sortPopular={this.displayPostsSortedByPopular}
              updateView={this.updateView}
            />
          </Col>
          <Col lg={10} sm={12}>
            {!this.state.isViewingComments && (
              <ListGroup className="ListGroup">
                {this.renderPostsInListGroup()}
              </ListGroup>
            )}
            {this.state.isViewingComments && this.renderCommentsInListGroup()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
