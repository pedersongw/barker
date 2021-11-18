import React from "react";
import axios from "axios";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import ListGroupItem from "./listGroupItem";
import ModalForm from "./modal";
import NavBar from "./navBar";

class Main extends React.Component {
  state = {
    entries: [],
    dbWasContacted: false,
    modalIsOpen: false,
  };

  async componentDidMount() {
    try {
      const { data: entries } = await axios.get(
        "https://barkerfield-test.herokuapp.com/api"
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
        "https://barkerfield-test.herokuapp.com/api"
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
        return "The database was successfully reached, but is empty";
      } else {
        return "State successfully populated with objects from database";
      }
    } else {
      return "Couldn't reach the server";
    }
  };

  onDelete = async (id) => {
    const response = await axios.delete("/api", {
      data: { _id: id },
    });
    console.log(response);
  };

  openModal = () => this.setState({ modalIsOpen: true });

  closeModal = () => this.setState({ modalIsOpen: false });

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
            {this.state.modalIsOpen ? (
              <ModalForm
                closeModal={this.closeModal}
                isOpen={this.state.modalIsOpen}
                value={this.state.modalIsOpen}
                updateView={this.updateView}
              />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col lg={2} sm={0}>
            <NavBar
              openModal={this.openModal}
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
