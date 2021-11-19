import React from "react";
import axios from "axios";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import ListGroupItem from "./listGroupItem";
import CreatePostModal from "./createPostModal";
import CreateUserModal from "./createUserModal";

import NavBar from "./navBar";

class Main extends React.Component {
  state = {
    entries: [],
    dbWasContacted: false,
    postModalOpen: false,
    userModalOpen: false,
  };

  async componentDidMount() {
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

  updateView = async () => {
    try {
      const { data: entries } = await axios.get(
        "http://localhost:3000/api/posts"
      );
      this.setState({ entries });
      console.log("update view called");
    } catch (error) {
      console.log("Couldn't reach to server", error);
    }
  };

  serverStatus = () => {
    const { dbWasContacted } = this.state;
    if (dbWasContacted) {
      if (dbWasContacted === "empty") {
        return "The database is empty";
      } else {
        return "State successfully populated with objects from database";
      }
    } else {
      return "Couldn't reach the server";
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
    } catch (error) {
      console.log(error, "Couldn't delete");
    }
  };

  openPostModal = () => this.setState({ postModalOpen: true });

  closePostModal = () => {
    this.setState({ postModalOpen: false });
  };

  openUserModal = () => this.setState({ userModalOpen: true });

  closeUserModal = () => this.setState({ userModalOpen: false });

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
          <Col className="d-flex justify-content-between">
            <h1>{this.serverStatus()}</h1>
            {this.state.postModalOpen ? (
              <CreatePostModal
                closePostModal={this.closePostModal}
                isOpen={this.state.postModalOpen}
                value={this.state.postModalOpen}
                updateView={this.updateView}
              />
            ) : null}
            {this.state.userModalOpen ? (
              <CreateUserModal
                closeUserModal={this.closeUserModal}
                isOpen={this.state.userModalOpen}
                value={this.state.userModalOpen}
                updateView={this.updateView}
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
