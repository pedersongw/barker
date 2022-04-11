import React from "react";
import { Link } from "react-router-dom";

class ForumDesktopNav extends React.Component {
  state = {
    navOpen: false,
  };

  sortByClicked = () => {
    if (!this.state.navOpen) {
      this.setState({ navOpen: true });
      window.addEventListener("click", this.handleClickOutsideSortBy);
    } else {
      this.setState({ navOpen: false });
      window.removeEventListener("click", this.handleClickOutsideSortBy);
    }
  };

  handleClickOutsideSortBy = (event) => {
    if (event.target.id === "desktop-sort-by") {
      return;
    } else if (event.target.className !== "desktop-nav-li") {
      this.sortByClicked();
    }
  };

  sortByArgument = (argument) => {
    this.setState({ navOpen: false });
    window.location.href = `/forum/1/${argument}`;
  };

  render() {
    return (
      <nav
        className="desktop-nav"
        id={this.state.navOpen ? "desktop-nav" : null}
      >
        <div className="desktop-nav-inner-wrapper">
          {this.props.user && this.props.user.isAdmin && (
            <div
              className="desktop-nav-div"
              onClick={() => console.log(this.state)}
            >
              Admin
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className="desktop-nav-div"
              onClick={() => (window.location.href = "/login/create")}
            >
              Create New User
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className="desktop-nav-div"
              onClick={() => (window.location.href = "/login/login")}
            >
              Login
            </div>
          )}
          {this.props.userLoggedIn() && (
            <div
              className="desktop-nav-div"
              onClick={() => this.props.openPostModal()}
            >
              Create Post
            </div>
          )}
          {this.props.userLoggedIn() && (
            <div
              className="desktop-nav-div"
              onClick={() => this.props.logOut()}
            >
              Logout
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className="desktop-nav-div"
              id="desktop-sort-by"
              onClick={() => this.sortByClicked()}
            >
              Sort By
              <ul
                className="desktop-sort-by-menu"
                id={this.state.navOpen ? "desktop-sort-by-menu-open" : null}
              >
                <li
                  className="desktop-nav-li"
                  onClick={() => this.sortByArgument("all")}
                >
                  All
                </li>
                <li
                  className="desktop-nav-li"
                  onClick={() => this.sortByArgument("popular")}
                >
                  Popular
                </li>

                <li
                  className="desktop-nav-li"
                  onClick={() => this.sortByArgument("my")}
                >
                  My Posts
                </li>
                <li
                  className="desktop-nav-li"
                  onClick={() => this.sortByArgument("new")}
                >
                  New
                </li>
                <li
                  className="desktop-nav-li"
                  onClick={() => this.sortByArgument("old")}
                >
                  Old
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default ForumDesktopNav;
