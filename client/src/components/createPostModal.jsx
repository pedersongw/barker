import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default class CreatePostModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closePostModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => this.props.onTitleChange(event)}
              placeholder="Title"
            />
            <Form.Label>Body: </Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => this.props.onBodyChange(event)}
              placeholder="body of post"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
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
