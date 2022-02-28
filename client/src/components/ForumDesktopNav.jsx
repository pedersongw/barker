import React from "react";
import { Link } from "react-router-dom";

class ForumDesktopNav extends React.Component {
  render() {
    return (
      <nav className="desktop-nav">
        {!this.props.userLoggedIn() && (
          <button
            id="create-new-user-button"
            onClick={() => this.props.openUserModal()}
          >
            Create Profile
          </button>
        )}
        {!this.props.userLoggedIn() && (
          <button id="login-button" onClick={() => this.props.logIn()}>
            Login
          </button>
        )}
        {this.props.userLoggedIn() && (
          <button
            id="create-post-button"
            onClick={() => this.props.openPostModal()}
          >
            Create Post
          </button>
        )}
        {this.props.userLoggedIn() && (
          <Link to="/forum/1/all">
            <button>All Posts</button>
          </Link>
        )}
        {this.props.userLoggedIn() && (
          <Link to="/forum/1/my">
            <button>My Posts</button>
          </Link>
        )}
        {this.props.userLoggedIn() && (
          <Link to="/forum/1/popular">
            <button>Sort By Popular</button>
          </Link>
        )}
        {this.props.userLoggedIn() && (
          <Link to="/forum/1/new">
            <button>Sort By New</button>
          </Link>
        )}
        {this.props.userLoggedIn() && (
          <Link to="/forum/1/old">
            <button>Sort By Old</button>
          </Link>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.logOut()}>Logout</button>
        )}
      </nav>
    );
  }
}

export default ForumDesktopNav;
