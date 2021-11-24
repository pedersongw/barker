import React from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import DateComponent from "./date";

class ListGroupItem extends React.Component {
  render() {
    return (
      <ListGroup.Item _id={this.props._id} className="justify-content-between">
        <div className="list-group-item border-0">
          <Row>
            <Col className="d-flex justify-content-start">
              <h5>{this.props.title}</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <DateComponent time={this.props.timePosted} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-start">
            <Col>
              <p className="body-text">{this.props.body}</p>
            </Col>
          </Row>
          <Row className="username">
            <small>{"posted by " + this.props.username[1]}</small>
            <Button onClick={() => this.props.onDelete(this.props.id)}>
              Delete Me
            </Button>
          </Row>
        </div>
      </ListGroup.Item>
    );
  }
}

export default ListGroupItem;
