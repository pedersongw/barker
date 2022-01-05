import React from "react";
import Post from "./Post";
import BottomMobileNavBar from "./BottomMobileNavBar";

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
    return (
      <div>
        <h1>Donate</h1>
        <BottomMobileNavBar page="donate" />
      </div>
    );
  }
}

export default Donate;
