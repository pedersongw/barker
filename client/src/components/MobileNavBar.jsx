import React from "react";
import Burger from "react-css-burger";
import { Link } from "react-router-dom";

class MobileNavBar extends React.Component {
  state = {
    width: window.innerWidth,
    navOpen: false,
  };
  render() {
    return (
      <div>
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
        <div className="burger">
          <Burger
            onClick={() => this.setState({ navOpen: !this.state.navOpen })}
            active={this.state.navOpen}
            burger="3dx"
            color="darkgray"
            hoverOpacity={0.8}
            scale={1.2}
          />
        </div>
      </div>
    );
  }
}

export default MobileNavBar;
