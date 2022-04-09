import React from "react";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

class ForumMobileNav extends React.Component {
  state = {
    navOpen: false,
    sortByClicked: false,
  };

  handleMenuOpen = () => {
    window.addEventListener("mousedown", this.handleClickOutsideMenu);
    this.props.navOpen();
    this.setState({ navOpen: true });
  };

  handleMenuClose = () => {
    window.removeEventListener("mousedown", this.handleClickOutsideMenu);
    this.props.navOpen();
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
  };

  handleClickOutsideMenu = (event) => {
    const container = document.getElementsByClassName("entire-menu")[0];
    console.log(event.target);
    if (container === undefined) {
      window.removeEventListener("mousedown", this.handleClickOutsideMenu);
    } else if (
      event.target.className === "blur-filter" ||
      event.target.id === "nav-mobile"
    ) {
      console.log("clicked outside mobile nav menu", event.target);
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

  sortByArgument = (argument) => {
    this.setState({ navOpen: false });
    window.location.href = `/forum/1/${argument}`;
  };

  navigate = (url) => {
    this.setState({ navOpen: false });
    if (url === "logout") {
      this.props.logOut();
    }
    window.location.href = `${url}`;
  };

  sortBy = () => {
    console.log("sort by button clicked");
    this.setState({ sortByClicked: !this.state.sortByClicked });
  };

  render() {
    return (
      <div className="entire-menu">
        <div
          className="blur-filter"
          id={this.state.navOpen ? "blur-filter" : null}
        ></div>
        <div
          className="forum-nav-icon"
          onClick={() => this.handleMenuOpen()}
          id={this.state.navOpen ? "hide-icon" : null}
        >
          Menu
        </div>
        <div
          className={
            this.state.navOpen === true ? "nav-mobile open" : "nav-mobile"
          }
          id="nav-mobile"
        >
          {this.props.userLoggedIn() && (
            <div
              className="sort-by mobile-nav-button"
              onClick={() => this.sortBy()}
            >
              Sort By
              <nav
                onClick={(e) => e.stopPropagation()}
                className="sort-by-nav"
                id={
                  this.state.sortByClicked && this.state.navOpen
                    ? "sort-by-open"
                    : "sort-by-closed"
                }
              >
                <ul className="sort-by-ul">
                  <li onClick={() => this.sortByArgument("all")}>All</li>
                  <li onClick={() => this.sortByArgument("popular")}>
                    Popular
                  </li>
                  <li onClick={() => this.sortByArgument("my")}>My Posts</li>
                  <li onClick={() => this.sortByArgument("new")}>New</li>
                  <li onClick={() => this.sortByArgument("old")}>Old</li>
                </ul>
              </nav>
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className="mobile-nav-button"
              onClick={() => this.openPostModal()}
            >
              Create Post
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className="mobile-nav-button"
              onClick={() => this.navigate("logout")}
            >
              Logout
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className="mobile-nav-button"
              onClick={() => this.navigate("/login/login")}
            >
              Login
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className="mobile-nav-button"
              onClick={() => this.navigate("/login/create")}
            >
              Create New User
            </div>
          )}
        </div>
        <div className={null}>
          <nav id="nav-content"></nav>
        </div>
      </div>
    );
  }
}

export default ForumMobileNav;
