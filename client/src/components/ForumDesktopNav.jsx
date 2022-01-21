import React from "react";

class ForumDesktopNav extends React.Component {
  render() {
    return (
      <div className="desktop-menu">
        <div>
          <nav id="desktop-nav-content">
            {!this.props.userLoggedIn() && (
              <div>
                <button
                  id="create-new-user-button"
                  onClick={() => this.props.openUserModal()}
                >
                  Create Profile
                </button>
              </div>
            )}
            {!this.props.userLoggedIn() && (
              <div>
                <button id="login-button" onClick={() => this.props.logIn()}>
                  Login
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button
                  id="create-post-button"
                  onClick={() => this.props.openPostModal()}
                >
                  Create Post
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.updateView()}>
                  All Posts
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.sortMyPosts()}>
                  My Posts
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.sortPopular()}>
                  Sort by Popular
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.sortByNew()}>
                  Sort by Newest
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.sortByOld()}>
                  Sort by Oldest
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button onClick={() => this.props.logOut()}>Logout</button>
              </div>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

export default ForumDesktopNav;
