import React from "react";
import { Link } from "react-router-dom";
class BottomMobileNavBar extends React.Component {
  render() {
    return (
      <div className="bottom-nav">
        <div className="bottom-nav-link" id="bottom-nav-1">
          {this.props.page === "home" ? (
            <Link to="/" onClick={() => console.log("already on that page")}>
              Home
            </Link>
          ) : (
            <Link to="/">Home</Link>
          )}
        </div>
        <div className="bottom-nav-link" id="bottom-nav-2">
          {this.props.page === "donate" ? (
            <Link
              to="/donate"
              onClick={() => console.log("already on that page")}
            >
              Donate
            </Link>
          ) : (
            <Link to="/donate">Donate</Link>
          )}
        </div>
        <div className="bottom-nav-link" id="bottom-nav-3">
          {this.props.page === "contact" ? (
            <Link
              to="/contact"
              onClick={() => console.log("already on that page")}
            >
              Contact
            </Link>
          ) : (
            <Link to="/contact">Contact</Link>
          )}
        </div>
        <div className="bottom-nav-link" id="bottom-nav-4">
          {this.props.page === "forum" ? (
            <Link
              to="/forum"
              onClick={() => console.log("already on that page")}
            >
              Forum
            </Link>
          ) : (
            <Link to="/forum">Forum</Link>
          )}
        </div>
      </div>
    );
  }
}

export default BottomMobileNavBar;
