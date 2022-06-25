import React from "react";
import styles from "./MobileNav.module.css";

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
    window.addEventListener("mousedown", this.handleClickOutsideMenu);
    this.props.navOpen();
    this.setState({ navOpen: true });
    document.body.style.overflow = "hidden";
  };

  handleMenuClose = () => {
    console.log("menu closed");
    window.removeEventListener("mousedown", this.handleClickOutsideMenu);
    this.props.navOpen();
    this.setState({ navOpen: false });
    this.setState({ sortByClicked: false });
    document.body.style.overflow = "scroll";
  };

  handleClickOutsideMenu = (event) => {
    const container = document.getElementsByClassName("entire-menu")[0];
    console.log(event.target);
    if (container === undefined) {
      window.removeEventListener("mousedown", this.handleClickOutsideMenu);
    } else if (
      event.target === this.blurFilter.current ||
      event.target.id === "nav-mobile"
    ) {
      console.log("clicked outside mobile nav menu", event.target);
      this.handleMenuClose();
    }
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
          ref={this.blurFilter}
          className={styles.blurFilter}
          id={this.state.navOpen ? styles.blurFilter : null}
        ></div>
        <div
          className={styles.forumNavIcon}
          onClick={() => this.handleMenuOpen()}
          id={this.state.navOpen ? styles.hideIcon : null}
        >
          Menu
        </div>
        <div
          className={
            this.state.navOpen === true
              ? `${styles.navMobile} ${styles.navMobileOpen}`
              : styles.navMobile
          }
          id="nav-mobile"
        >
          {this.props.userLoggedIn() && (
            <div
              className={`${styles.sortBy} ${styles.mobileNavButton}`}
              onClick={() => this.sortBy()}
            >
              Sort By
              <nav
                onClick={(e) => e.stopPropagation()}
                className={styles.sortByNav}
                id={
                  this.state.sortByClicked && this.state.navOpen
                    ? styles.sortByOpen
                    : "sort-by-closed"
                }
              >
                <ul className={styles.sortByUl}>
                  <li
                    id={this.props.sort === "all" ? styles.liSelected : null}
                    onClick={() => this.sortByArgument("all")}
                  >
                    All
                  </li>
                  <li
                    id={
                      this.props.sort === "popular" ? styles.liSelected : null
                    }
                    onClick={() => this.sortByArgument("popular")}
                  >
                    Popular
                  </li>

                  <li
                    id={this.props.sort === "my" ? styles.liSelected : null}
                    onClick={() => this.sortByArgument("my")}
                  >
                    My Posts
                  </li>

                  <li
                    id={this.props.sort === "new" ? styles.liSelected : null}
                    onClick={() => this.sortByArgument("new")}
                  >
                    New
                  </li>

                  <li
                    id={this.props.sort === "old" ? styles.liSelected : null}
                    onClick={() => this.sortByArgument("old")}
                  >
                    Old
                  </li>
                </ul>
              </nav>
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.openPostModal()}
            >
              Create Post
            </div>
          )}

          {this.props.userLoggedIn() && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.navigate("logout")}
            >
              Logout
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.navigate("/login/login")}
            >
              Login
            </div>
          )}
          {!this.props.userLoggedIn() && (
            <div
              className={styles.mobileNavButton}
              onClick={() => this.navigate("/login/create")}
            >
              Create New User
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
