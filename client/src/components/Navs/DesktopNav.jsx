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
                  id={this.props.sort === "old" ? styles.selected : null}
                  onClick={() => this.props.sortByOld()}
                >
                  Old
                </li>
                <li
                  className={styles.navLi}
                  id={this.props.sort === "new" ? styles.selected : null}
                  onClick={() => this.props.sortByNew()}
                >
                  New
                </li>
                <li
                  className={styles.navLi}
                  id={this.props.sort === "popular" ? styles.selected : null}
                  onClick={() => this.props.sortPopular()}
                >
                  Popular
                </li>

                <li
                  className={styles.navLi}
                  id={this.props.sort === "my" ? styles.selected : null}
                  onClick={() => this.props.sortMyPosts()}
                >
                  My Posts
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
