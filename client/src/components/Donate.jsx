import React from "react";
import MobileNavBar from "./MobileNavBar";
import PhoneNavigation from "./PhoneNavigation";
import Burger from "react-css-burger";

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
        <header className={this.state.navOpen === true ? "open" : "header"}>
          <nav class="home" id="menu"></nav>
          <nav id="nav-content">
            <div class="nav-background">hello</div>
          </nav>
        </header>
        <div className="burger">
          <Burger
            onClick={() => this.setState({ navOpen: !this.state.navOpen })}
            active={this.state.navOpen}
            burger="3dx"
            color="black"
            hoverOpacity={0.8}
            scale={1.2}
          />
        </div>
      </div>
    );
  }
}

export default Donate;
