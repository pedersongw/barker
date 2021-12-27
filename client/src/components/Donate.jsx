import React from "react";
import MobileNavBar from "./MobileNavBar";

class Donate extends React.Component {
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
        <h1>Donate</h1>
        {width < 800 && <MobileNavBar />}
      </div>
    );
  }
}

export default Donate;
