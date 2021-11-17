import React from "react";
import axios from "axios";
import { Button, Container, ListGroup } from "react-bootstrap";
import ListGroupItem from "./listGroupItem";
import ModalForm from "./modal";

class Rename extends React.Component {
  state = {
    entries: [],
    dbWasContacted: false,
    modalIsOpen: false,
  };

  async componentDidMount() {
    try {
      const { data: entries } = await axios.get("/api");
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

  mapListFromState(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onDelete = async (id) => {
    const response = await axios.delete("/api", {
      data: { _id: id },
    });
    console.log(response);
  };

  openModal = () => this.setState({ modalIsOpen: true });

  closeModal = () => this.setState({ modalIsOpen: false });

  handleSubmit = (name) => {
    console.log(name);
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

  newDate = () => {
    console.log(new Date());
  };

  render() {
    return (
      <div>
        <h1>{this.serverStatus()}</h1>
        <Button onClick={(event) => this.mapListFromState(event)}>
          console .log state entries
        </Button>
        <Button onClick={(event) => this.createNewPost(event)}>
          create new hard wired post
        </Button>
        {this.state.modalIsOpen ? (
          <ModalForm
            closeModal={this.closeModal}
            isOpen={this.state.modalIsOpen}
            value={this.state.modalIsOpen}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
        <Button onClick={this.openModal}>Display Modal Form</Button>
        <Button onClick={this.newDate}>console.log new Date()</Button>
        <ListGroup className="ListGroup">
          <Container>{this.renderPostsInListGroup()}</Container>
        </ListGroup>
      </div>
    );
  }
}

export default Rename;
