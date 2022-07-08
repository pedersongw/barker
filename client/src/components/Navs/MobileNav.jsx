import React from "react";
import styles from "./MobileNav.module.css";
import { FaPlus } from "react-icons/fa";

class ForumMobileNav extends React.Component {
  state = {
    navOpen: false,
    sortByClicked: false,
  };

  constructor(props) {
    super(props);
    this.blurFilter = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", () => console.log(this.state));
  }

  handleMenuOpen = () => {
    this.setState({ navOpen: true });
    document.body.style.overflow = "hidden";
  };

  handleMenuClose = () => {
    console.log("menu closed");
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
    document.body.style.overflow = "scroll";
  };

  logIn = () => {
    this.handleMenuClose();
    this.props.logIn();
  };

  onLogIn = () => {
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
    this.props.logIn();
  };

  createNewUser = () => {
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
    this.props.openUserModal();
  };

  openPostModal = () => {
    this.props.openPostModal();
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
  };

  sortBy = (event) => {
    event.stopPropagation();
    console.log("sort by button clicked");
    this.setState({ sortByClicked: !this.state.sortByClicked });
  };

  sortByArg = (arg) => {
    this.handleMenuClose();
    if (arg === "popular") {
      this.props.sortByPopular();
    } else if (arg === "my") {
      this.props.sortMyPosts();
    } else if (arg === "new") {
      this.props.sortByNew();
    } else if (arg === "old") {
      this.props.sortByOld();
    }
  };

  render() {
    return (
      <div className="entire-menu">
        <div
          ref={this.blurFilter}
          className={styles.blurFilter}
          id={this.state.navOpen ? styles.blurFilter : null}
          onClick={() => this.handleMenuClose()}
        ></div>
        <div
          className={styles.forumNavIcon}
          onClick={() => this.handleMenuOpen()}
          id={this.state.navOpen ? styles.hideIcon : null}
        >
          <FaPlus className={styles.icon} />
        </div>
        <div
          className={
            this.state.navOpen === true
              ? `${styles.navMobile} ${styles.navMobileOpen}`
              : styles.navMobile
          }
          id="nav-mobile"
          onClick={() => this.handleMenuClose()}
        >
          {this.props.userLoggedIn && (
            <div
              className={`${styles.sortBy} ${styles.mobileNavButton}`}
              onClick={(event) => this.sortBy(event)}
            >
              Sort By
              <nav
                className={styles.sortByNav}
                id={
                  this.state.sortByClicked && this.state.navOpen
                    ? styles.sortByOpen
                    : "sort-by-closed"
                }
              >
                <ul className={styles.sortByUl}>
                  <li
                    id={this.props.sort === "old" ? styles.liSelected : null}
                    onClick={() => this.sortByArg("old")}
                  >
                    Old
                  </li>
                  <li
                    id={this.props.sort === "new" ? styles.liSelected : null}
                    onClick={() => this.sortByArg("new")}
                  >
                    New
                  </li>

                  <li
                    id={
                      this.props.sort === "popular" ? styles.liSelected : null
                    }
                    onClick={() => this.sortByArg("popular")}
                  >
                    Popular
                  </li>

                  <li
                    id={this.props.sort === "my" ? styles.liSelected : null}
                    onClick={() => this.sortByArg("my")}
                  >
                    My Posts
                  </li>
                </ul>
              </nav>
            </div>
          )}

          {this.props.userLoggedIn && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.openPostModal()}
            >
              Create Post
            </div>
          )}

          {this.props.userLoggedIn && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.props.logOut()}
            >
              Logout
            </div>
          )}
          {!this.props.userLoggedIn && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.logIn()}
            >
              Login
            </div>
          )}
        </div>
        <div className={null}>
          <nav id={styles.navContent}></nav>
        </div>
      </div>
    );
  }
}

export default ForumMobileNav;
