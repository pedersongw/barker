import React from "react";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

class ForumNavIcon extends React.Component {
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
    } else {
    }
  };

  onLogIn = () => {
    this.setState({ navOpen: false });
    this.props.logIn();
  };

  openPostModal = () => {
    this.setState({ navOpen: false });
    this.props.openPostModal();
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
            <div>
              <a onClick={() => this.onLogIn()}>Login</a>
            </div>
            {this.props.userLoggedIn() && (
              <div>
                <a onClick={() => this.openPostModal()}>Create Post</a>
              </div>
            )}

            <div>
              {this.props.page === "donate" ? (
                <Link
                  to="/donate"
                  onClick={() =>
                    this.setState({ navOpen: !this.state.navOpen })
                  }
                >
                  Donate
                </Link>
              ) : (
                <Link to="/donate">Donate</Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default ForumNavIcon;
