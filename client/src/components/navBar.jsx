import React from "react";
class NavBar extends React.Component {
  state = {
    hovered: "",
    clicked: "",
  };

  divHovered = (arg) => {
    this.setState({ hovered: arg });
  };

  mouseOutFired = (arg) => {
    this.setState({ hovered: "" });
  };

  mouseDownFired = (arg) => {
    if (arg === "Create New") {
      this.props.openPostModal();
      return;
    } else if (arg === "Create New User") {
      this.props.openUserModal();
      return;
    } else if (arg === "Log In") {
      this.props.logIn();
      return;
    } else if (arg === "Log Out") {
      this.props.logOut();
    } else if (arg === "New") {
      this.props.sortByNew();
    } else if (arg === "Old") {
      this.props.sortByOld();
      console.log(this.props.userLoggedIn());
    } else if (arg === "My Posts") {
      this.props.sortMyPosts();
    } else if (arg === "All Posts") {
      this.props.updateView();
    } else if (arg === "Popular") {
      this.props.sortPopular();
    }
    this.setState({ clicked: arg });
  };

  mouseUpFired = (arg) => {
    this.setState({ clicked: "" });
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
      <div className="nav-container">
        {this.props.userLoggedIn() && (
          <div
            onMouseOver={() => this.divHovered("Create New")}
            onMouseOut={() => this.mouseOutFired("Create New")}
            onMouseDown={() => this.mouseDownFired("Create New")}
            onMouseUp={() => this.mouseUpFired("Create New")}
            className={this.determineClass("Create New")}
          >
            Create New Post
          </div>
        )}
        {!this.props.userLoggedIn() && (
          <div
            onMouseOver={() => this.divHovered("Create New User")}
            onMouseOut={() => this.mouseOutFired("Create New User")}
            onMouseDown={() => this.mouseDownFired("Create New User")}
            onMouseUp={() => this.mouseUpFired("Create New User")}
            className={this.determineClass("Create New User")}
          >
            Create New User
          </div>
        )}

        {!this.props.userLoggedIn() && (
          <div
            onMouseOver={() => this.divHovered("Log In")}
            onMouseOut={() => this.mouseOutFired("Log In")}
            onMouseDown={() => this.mouseDownFired("Log In")}
            onMouseUp={() => this.mouseUpFired("Log In")}
            className={this.determineClass("Log In")}
          >
            Login
          </div>
        )}

        {this.props.userLoggedIn() && (
          <div
            onMouseOver={() => this.divHovered("Log Out")}
            onMouseOut={() => this.mouseOutFired("Log Out")}
            onMouseDown={() => this.mouseDownFired("Log Out")}
            onMouseUp={() => this.mouseUpFired("Log Out")}
            className={this.determineClass("Log Out")}
          >
            Log out
          </div>
        )}
        {this.props.userLoggedIn() && (
          <div
            onMouseOver={() => this.divHovered("My Posts")}
            onMouseOut={() => this.mouseOutFired("My Posts")}
            onMouseDown={() => this.mouseDownFired("My Posts")}
            onMouseUp={() => this.mouseUpFired("My Posts")}
            className={this.determineClass("My Posts")}
          >
            My Posts
          </div>
        )}
        <div
          onMouseOver={() => this.divHovered("All Posts")}
          onMouseOut={() => this.mouseOutFired("All Posts")}
          onMouseDown={() => this.mouseDownFired("All Posts")}
          onMouseUp={() => this.mouseUpFired("All Posts")}
          className={this.determineClass("All Posts")}
        >
          All Posts
        </div>
        <div
          onMouseOver={() => this.divHovered("Popular")}
          onMouseOut={() => this.mouseOutFired("Popular")}
          onMouseDown={() => this.mouseDownFired("Popular")}
          onMouseUp={() => this.mouseUpFired("Popular")}
          className={this.determineClass("Popular")}
        >
          Popular
        </div>
        <div
          onMouseOver={() => this.divHovered("New")}
          onMouseOut={() => this.mouseOutFired("New")}
          onMouseDown={() => this.mouseDownFired("New")}
          onMouseUp={() => this.mouseUpFired("New")}
          className={this.determineClass("New")}
        >
          New
        </div>
        <div
          onMouseOver={() => this.divHovered("Old")}
          onMouseOut={() => this.mouseOutFired("Old")}
          onMouseDown={() => this.mouseDownFired("Old")}
          onMouseUp={() => this.mouseUpFired("Old")}
          className={this.determineClass("Old")}
          id="last-nav-link-div"
        >
          Old
        </div>
      </div>
    );
  }
}

export default NavBar;
