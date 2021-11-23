import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default class CreateUserModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => this.props.onNameChange(event)}
              placeholder="first and last"
            />
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => this.props.onEmailChange(event)}
              placeholder="email"
            />
            <Form.Label>password: </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => this.props.onPasswordChange(event)}
              placeholder="password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {this.props.error && (
            <div className="alert alert-danger">{this.props.error}</div>
          )}
          <Button
            variant="primary"
            type="submit"
            onClick={() => this.props.onSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
