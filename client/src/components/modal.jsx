import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

export default class ModalForm extends React.Component {
  state = {
    title: "",
    body: "",
    name: "",
  };

  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleBodyChange = (e) => this.setState({ body: e.target.value });
  handleNameChange = (e) => this.setState({ name: e.target.value });
  handleSubmit = async () => {
    const { title, body, name } = this.state;
    const postObj = {
      title: title,
      body: body,
      username: name,
      timePosted: new Date(),
      likes: ["pedersongw", "somebody else"],
    };
    const response = await axios.post(
      "https://barkerfield-test.herokuapp.com/api",
      postObj
    );
    console.log(response);
    this.props.closeModal();
  };

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.title}
              placeholder="Title"
            />
            <Form.Label>Body: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleBodyChange}
              value={this.state.body}
              placeholder="body of post"
            />
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleNameChange}
              value={this.state.name}
              placeholder="your name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
