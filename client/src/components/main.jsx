import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Container, Col, Row, ListGroup, Button } from "react-bootstrap";
import ListGroupItem from "./listGroupItem";
import CreatePostModal from "./createPostModal";
import CreateUserModal from "./createUserModal";
import CreateLoginModal from "./createLoginModal";
import NavBar from "./navBar";

class Main extends React.Component {
  state = {
    entries: [],
    dbWasContacted: false,
    postModalOpen: false,
    userModalOpen: false,
    loginModalOpen: false,
    user: null,
    createUserError: "",
    postTitle: "",
    postBody: "",
    userName: "",
    userEmail: "",
    userPassword: "",
  };

  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user: user });
    } catch (ex) {
      this.setState({ user: null });
    }
    try {
      const { data: entries } = await axios.get(
        "http://barkerfield-test.herokuapp.com/api/posts"
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

  userLoggedIn = () => {
    if (this.state.user === null) {
      return false;
    } else {
      return true;
    }
  };

  handlePostTitleChange = (e) => this.setState({ postTitle: e.target.value });
  handlePostBodyChange = (e) => this.setState({ postBody: e.target.value });
  closePostModal = () => {
    this.setState({ postModalOpen: false });
  };

  handleUserEmailChange = (e) => this.setState({ userEmail: e.target.value });
  handleUserPasswordChange = (e) =>
    this.setState({ userPassword: e.target.value });
  handleUserNameChange = (e) => this.setState({ userName: e.target.value });

  openUserModal = () => this.setState({ userModalOpen: true });

  closeUserModal = () => this.setState({ userModalOpen: false });

  openLoginModal = () => this.setState({ loginModalOpen: true });

  closeLoginModal = () => this.setState({ loginModalOpen: false });

  onSubmitPost = async () => {
    const { postTitle, postBody } = this.state;
    const postObj = {
      title: postTitle,
      body: postBody,
      timePosted: new Date(),
      username: [this.state.user, this.state.user.name],
      likes: ["pedersongw", "somebody else"],
    };
    try {
      const response = await axios.post(
        "http://barkerfield-test.herokuapp.com/api/posts",
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
        "http://barkerfield-test.herokuapp.com/api/users",
        postObj
      );
      console.log(response);
      this.closeUserModal();
    } catch (error) {
      console.log(
        error.response.status,
        error.response.data.details[0].message
      );
      this.setState({
        createUserError: error.response.data.details[0].message,
      });
    }
  };

  updateView = async () => {
    try {
      const { data: entries } = await axios.get(
        "http://barkerfield-test.herokuapp.com/api/posts"
      );
      this.setState({ entries });
      console.log("update view called");
    } catch (error) {
      console.log("Couldn't reach to server", error);
    }
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
      const response = await axios.delete(
        "http://barkerfield-test.herokuapp.com/api/posts",
        {
          data: { _id: id },
        }
      );
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

  openPostModal = () => this.setState({ postModalOpen: true });

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

  renderPostsInListGroup = () => {
    return this.state.entries.map((entry) => {
      return (
        <ListGroupItem
          key={entry._id}
          id={entry._id}
          title={entry.title}
          body={entry.body}
          timePosted={entry.timePosted}
          username={entry.username}
          onDelete={this.onDelete}
        />
      );
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Button onClick={() => console.log(this.state.user)}>
            console.log user
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
                error={this.state.createUserError}
              />
            ) : null}
            {this.state.loginModalOpen ? (
              <CreateLoginModal
                closeLoginModal={this.closeLoginModal}
                isOpen={this.state.loginModalOpen}
                value={this.state.loginModalOpen}
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
            />
          </Col>
          <Col lg={10} sm={12}>
            <ListGroup className="ListGroup">
              {this.renderPostsInListGroup()}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
