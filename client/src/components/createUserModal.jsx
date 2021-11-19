import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

export default class CreateUserModal extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleEmailChange = (e) => this.setState({ email: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });
  handleNameChange = (e) => this.setState({ name: e.target.value });
  handleSubmit = async () => {
    const { email, password, name } = this.state;
    const postObj = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/api/users",
      postObj
    );
    console.log(response);
    this.props.closeUserModal();
    this.props.updateView();
  };

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleNameChange}
              value={this.state.name}
              placeholder="your name"
            />
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleEmailChange}
              value={this.state.email}
              placeholder="email"
            />
            <Form.Label>password: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              placeholder="password"
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
