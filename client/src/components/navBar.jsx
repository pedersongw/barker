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
    }
    this.setState({ clicked: arg });
  };

  mouseUpFired = (arg) => {
    this.setState({ clicked: "" });
  };

  determineClassCreateNew = () => {
    return this.determineClass("Create New");
  };
  determineClassCreateNewUser = () => {
    return this.determineClass("Create New User");
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
  determineClassAllPosts = () => {
    return this.determineClass("All Posts");
  };
  determineClassLogin = () => {
    return this.determineClass("Log In");
  };
  determineClassLogout = () => {
    return this.determineClass("Log Out");
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
            className={this.determineClassCreateNew()}
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
            className={this.determineClassCreateNewUser()}
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
            className={this.determineClassLogin()}
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
            className={this.determineClassLogout()}
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
            className={this.determineClassMyPosts()}
          >
            My Posts
          </div>
        )}
        <div
          onMouseOver={() => this.divHovered("All Posts")}
          onMouseOut={() => this.mouseOutFired("All Posts")}
          onMouseDown={() => this.mouseDownFired("All Posts")}
          onMouseUp={() => this.mouseUpFired("All Posts")}
          className={this.determineClassAllPosts()}
        >
          All Posts
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
          id="last-nav-link-div"
        >
          Old
        </div>
      </div>
    );
  }
}

export default NavBar;
