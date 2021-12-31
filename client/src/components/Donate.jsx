import React from "react";
import MobileNavBar from "./MobileNavBar";

class Donate extends React.Component {
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
    return <MobileNavBar page="donate" />;
  }
}

export default Donate;
