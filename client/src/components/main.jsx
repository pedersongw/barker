import React from "react";
import MobileNavBar from "./MobileNavBar";

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
    const { width } = this.state;
    return (
      <div>
        <MobileNavBar page="home" />
        <h1>Main</h1>
        {width < 800 && <MobileNavBar />}
      </div>
    );
  }
}

export default Main;
