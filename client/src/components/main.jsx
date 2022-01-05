import React from "react";
import BottomMobileNavBar from "./BottomMobileNavBar";

class Main extends React.Component {
  state = {
    width: window.innerWidth,
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
  render() {
    return (
      <div>
        <BottomMobileNavBar page="home" />
        <h1>Main</h1>
      </div>
    );
  }
}

export default Main;
