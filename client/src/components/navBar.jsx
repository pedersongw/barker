import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";

class NavBar extends React.Component {
  state = {
    hovered: "",
    clicked: "",
  };

  divHovered = (arg) => {
    console.log("hovered");
    this.setState({ hovered: arg });
  };

  mouseOutFired = (arg) => {
    this.setState({ hovered: "" });
  };

  mouseDownFired = (arg) => {
    this.setState({ clicked: arg });
  };

  mouseUpFired = (arg) => {
    this.setState({ clicked: "" });
  };

  determineClassCreateNew = () => {
    return this.determineClass("Create New");
  };
  determineClassLogin = () => {
    return this.determineClass("Login");
  };
  determineClassPopular = () => {
    return this.determineClass("Popular");
  };
  determineClassNew = () => {
    return this.determineClass("New");
  };
  determineClassOld = () => {
    return this.determineClass("Old");
  };
  determineClassMyPosts = () => {
    return this.determineClass("My Posts");
  };

  determineClass = (arg) => {
    const { hovered, clicked } = this.state;
    if (clicked === arg) {
      return "nav-link-div nav-link-clicked";
    } else if (hovered === arg) {
      return "nav-link-div nav-link-hovered";
    } else {
      return "nav-link-div";
    }
  };
  render() {
    return (
      <React.Fragment>
        <div
          onMouseOver={() => this.divHovered("Create New")}
          onMouseOut={() => this.mouseOutFired("Create New")}
          onMouseDown={() => this.mouseDownFired("Create New")}
          onMouseUp={() => this.mouseUpFired("Create New")}
          className={this.determineClassCreateNew()}
        >
          Create New Post
        </div>

        <div
          onMouseOver={() => this.divHovered("Login")}
          onMouseOut={() => this.mouseOutFired("Login")}
          onMouseDown={() => this.mouseDownFired("Login")}
          onMouseUp={() => this.mouseUpFired("Login")}
          className={this.determineClassLogin()}
        >
          Login
        </div>

        <div
          onMouseOver={() => this.divHovered("Popular")}
          onMouseOut={() => this.mouseOutFired("Popular")}
          onMouseDown={() => this.mouseDownFired("Popular")}
          onMouseUp={() => this.mouseUpFired("Popular")}
          className={this.determineClassPopular()}
        >
          Popular
        </div>
        <div
          onMouseOver={() => this.divHovered("New")}
          onMouseOut={() => this.mouseOutFired("New")}
          onMouseDown={() => this.mouseDownFired("New")}
          onMouseUp={() => this.mouseUpFired("New")}
          className={this.determineClassNew()}
        >
          New
        </div>
        <div
          onMouseOver={() => this.divHovered("Old")}
          onMouseOut={() => this.mouseOutFired("Old")}
          onMouseDown={() => this.mouseDownFired("Old")}
          onMouseUp={() => this.mouseUpFired("Old")}
          className={this.determineClassOld()}
        >
          Old
        </div>

        <div
          onMouseOver={() => this.divHovered("My Posts")}
          onMouseOut={() => this.mouseOutFired("My Posts")}
          onMouseDown={() => this.mouseDownFired("My Posts")}
          onMouseUp={() => this.mouseUpFired("My Posts")}
          className={this.determineClassMyPosts()}
          id="last-nav-link-div"
        >
          My Posts
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
