import React from "react";
import styles from "./DesktopNav.module.css";

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
    let id = event.target.id.split("_");
    let className = event.target.id.split("_");
    if (id[1] === "sortBy") {
      return;
    } else if (className[1] !== "navLi") {
      this.sortByClicked();
    }
  };

  sortByArgument = (argument) => {
    this.setState({ navOpen: false });
    window.location.href = `/forum/1/${argument}`;
  };

  render() {
    return (
      <nav className={styles.nav} id={this.state.navOpen ? styles.nav : null}>
        <div className={styles.innerWrapper}>
          {this.props.user && this.props.user.isAdmin && (
            <div
              className={styles.navDiv}
              onClick={() => (window.location.href = "/admin")}
            >
              Admin
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className={styles.navDiv}
              onClick={() => (window.location.href = "/login/create")}
            >
              Create New User
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className={styles.navDiv}
              onClick={() => (window.location.href = "/login/login")}
            >
              Login
            </div>
          )}
          {this.props.userLoggedIn() && (
            <div
              className={styles.navDiv}
              onClick={() => this.props.openPostModal()}
            >
              Create Post
            </div>
          )}
          {this.props.userLoggedIn() && (
            <div className={styles.navDiv} onClick={() => this.props.logOut()}>
              Logout
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className={styles.navDiv}
              id={styles.sortBy}
              onClick={() => this.sortByClicked()}
            >
              Sort By
              <ul
                className={styles.sortMenu}
                id={this.state.navOpen ? styles.sortMenuOpen : null}
              >
                <li
                  className={styles.navLi}
                  id={this.props.sort === "all" ? "li-selected" : null}
                  onClick={() => this.sortByArgument("all")}
                >
                  All
                </li>
                <li
                  className={styles.navLi}
                  id={this.props.sort === "popular" ? "li-selected" : null}
                  onClick={() => this.sortByArgument("popular")}
                >
                  Popular
                </li>

                <li
                  className={styles.navLi}
                  id={this.props.sort === "my" ? "li-selected" : null}
                  onClick={() => this.sortByArgument("my")}
                >
                  My Posts
                </li>
                <li
                  className={styles.navLi}
                  id={this.props.sort === "new" ? "li-selected" : null}
                  onClick={() => this.sortByArgument("new")}
                >
                  New
                </li>
                <li
                  className={styles.navLi}
                  id={this.props.sort === "old" ? "li-selected" : null}
                  onClick={() => this.sortByArgument("old")}
                >
                  Old
                </li>
              </ul>
            </div>
          )}
        </div>
        {!this.props.userLoggedIn() && (
          <h2 className={styles.serverStatus}>
            {!this.state.user && this.props.status()}
          </h2>
        )}
      </nav>
    );
  }
}

export default ForumDesktopNav;
