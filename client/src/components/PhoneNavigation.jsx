import React from "react";
import Burger from "react-css-burger";

class PhoneNavigation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={this.props.open ? "show_side_bar side_bar" : "side_bar"}
        >
          <nav>
            <ul>
              <li className="subMenu navItem">
                <a href="/">Courses</a>
              </li>
              <li className="navItem">
                <a href="/">Pricing</a>
              </li>
              <li className="navItem">
                <a href="/">Mission</a>
              </li>
              <li className="subMenu navItem">
                <a href="/">About us</a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default PhoneNavigation;
