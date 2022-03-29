import React from "react";
import { Link } from "react-router-dom";

class ForumDesktopNav extends React.Component {
  render() {
    return (
      <nav className="desktop-nav">
        {this.props.user && this.props.user.isAdmin && (
          <Link to="/admin">
            <button>Admin</button>
          </Link>
        )}

        {!this.props.userLoggedIn() && (
          <Link to="/login/create">
            <button>Create New User</button>
          </Link>
        )}
        {!this.props.userLoggedIn() && (
          <Link to="/login/login">
            <button>Login</button>
          </Link>
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
