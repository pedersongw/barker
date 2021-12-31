import React from "react";
import Burger from "react-css-burger";
import { Link } from "react-router-dom";

class Donate extends React.Component {
  state = {
    width: window.innerWidth,
    navOpen: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleNavToggle = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  render() {
    const { width } = this.state;
    return (
      <div>
        <div
          className={
            this.state.navOpen === true ? "mobile-nav open" : "mobile-nav"
          }
        >
          <nav id="nav-content">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/forum">Forum</Link>
            </div>
            <div>
              <Link to="/donate">Donate</Link>
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

export default Donate;
