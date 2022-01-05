import React from "react";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

class ForumNavIcon extends React.Component {
  state = {
    isHoveredOrTouched: false,
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

  render() {
    return (
      <div className="entire-menu">
        <div
          className="forum-nav-icon"
          id={this.state.isHoveredOrTouched ? "forum-nav-icon-hovered" : null}
          onClick={() => this.handleMenuOpen()}
          onMouseOver={() => this.setState({ isHoveredOrTouched: true })}
          onMouseOut={() => this.setState({ isHoveredOrTouched: false })}
        >
          <FaWrench />
        </div>
        <div
          className={
            this.state.navOpen === true ? "mobile-nav open" : "mobile-nav"
          }
        >
          <nav id="nav-content">
            <div>
              {this.props.page === "home" ? (
                <Link
                  to="/"
                  onClick={() =>
                    this.setState({ navOpen: !this.state.navOpen })
                  }
                >
                  Home
                </Link>
              ) : (
                <Link to="/">Home</Link>
              )}
            </div>
            <div>
              {this.props.page === "forum" ? (
                <Link
                  to="/forum"
                  onClick={() =>
                    this.setState({ navOpen: !this.state.navOpen })
                  }
                >
                  Forum
                </Link>
              ) : (
                <Link to="/forum">Forum</Link>
              )}
            </div>
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
