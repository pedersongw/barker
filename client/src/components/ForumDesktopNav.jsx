import React from "react";

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
          <button onClick={() => this.props.updateView()}>All Posts</button>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.sortMyPosts()}>My Posts</button>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.sortPopular()}>
            Sort by Popular
          </button>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.sortByNew()}>Sort by Newest</button>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.sortByOld()}>Sort by Oldest</button>
        )}
        {this.props.userLoggedIn() && (
          <button onClick={() => this.props.logOut()}>Logout</button>
        )}
      </nav>
    );
  }
}

export default ForumDesktopNav;
