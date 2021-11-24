import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

export default class CreateUserModal extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleEmailChange = (e) => this.setState({ email: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });
  handleSubmit = async () => {
    const { email, password } = this.state;
    const postObj = {
      email: email,
      password: password,
    };

    const response = await axios.post("/api/auth", postObj);
    console.log(response);
    localStorage.setItem("token", response.data);
    this.props.closeLoginModal();
    window.location = "/";
  };

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleEmailChange}
              value={this.state.email}
              placeholder="email"
            />
            <Form.Label>password: </Form.Label>
            <Form.Control
              type="password"
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
