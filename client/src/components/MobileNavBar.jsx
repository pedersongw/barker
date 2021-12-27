import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBullhorn, FaGift } from "react-icons/fa";

class MobileNavBar extends React.Component {
  render() {
    return (
      <div className="custom-navbar">
        <Link to="/">
          <div className="custom-navbar-button" id="nav-button-1">
            <div className="icon">
              <FaHome />
            </div>
            <div className="icon">Home</div>
          </div>
        </Link>
        <Link to="/forum">
          <div className="custom-navbar-button" id="nav-button-2">
            <div className="icon">
              <FaBullhorn />
            </div>
            <div className="icon">Forum</div>
          </div>
        </Link>
        <Link to="/donate">
          <div className="custom-navbar-button" id="nav-button-3">
            <div className="icon">
              <FaGift />
            </div>
            <div className="icon">Donate</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default MobileNavBar;
