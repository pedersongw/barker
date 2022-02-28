import React from "react";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

class ForumMobileNav extends React.Component {
  state = {
    navOpen: false,
  };

  handleMenuOpen = () => {
    window.addEventListener("click", this.handleClickOutsideMenu);
    this.setState({ navOpen: true });
  };

  handleMenuClose = () => {
    window.removeEventListener("click", this.handleClickOutsideMenu);
    this.setState({ navOpen: false });
  };

  handleClickOutsideMenu = (event) => {
    const container = document.getElementsByClassName("entire-menu")[0];
    if (container === undefined) {
      window.removeEventListener("click", this.handleClickOutsideMenu);
    } else if (
      container !== event.target &&
      !container.contains(event.target)
    ) {
      this.handleMenuClose();
    }
  };

  onLogIn = () => {
    this.setState({ navOpen: false });
    this.props.logIn();
  };

  createNewUser = () => {
    this.setState({ navOpen: false });
    this.props.openUserModal();
  };

  openPostModal = () => {
    this.props.openPostModal();
    this.setState({ navOpen: false });
  };

  updateViewAllPosts = () => {
    this.props.updateView();
    this.setState({ navOpen: false });
  };

  sortByMyPosts = () => {
    this.props.sortMyPosts();
    this.setState({ navOpen: false });
  };

  sortByNew = () => {
    this.props.sortByNew();
    this.setState({ navOpen: false });
  };

  sortByOld = () => {
    this.props.sortByOld();
    this.setState({ navOpen: false });
  };

  sortByPopular = () => {
    this.props.sortPopular();
    this.setState({ navOpen: false });
  };

  render() {
    return (
      <div className="entire-menu">
        <div className="forum-nav-icon" onClick={() => this.handleMenuOpen()}>
          <FaWrench />
        </div>
        <div
          className={
            this.state.navOpen === true ? "mobile-nav open" : "mobile-nav"
          }
        >
          <nav id="nav-content">
            {!this.props.userLoggedIn() && (
              <div>
                <button
                  id="create-new-user-button"
                  onClick={() => this.createNewUser()}
                >
                  Create Profile
                </button>
              </div>
            )}
            {!this.props.userLoggedIn() && (
              <div>
                <button id="login-button" onClick={() => this.onLogIn()}>
                  Login
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <button
                  id="create-post-button"
                  onClick={() => this.openPostModal()}
                >
                  Create Post
                </button>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <Link to="/forum/1/all">
                  <button>All Posts</button>
                </Link>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <Link to="/forum/1/my">
                  <button>My Posts</button>
                </Link>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <Link to="/forum/1/popular">
                  <button>Sort By Popular</button>
                </Link>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <Link to="/forum/1/new">
                  <button>Sort By New</button>
                </Link>
              </div>
            )}
            {this.props.userLoggedIn() && (
              <div>
                <Link to="/forum/1/old">
                  <button>Sort By Old</button>
                </Link>
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

export default ForumMobileNav;
