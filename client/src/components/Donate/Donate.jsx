import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import styles from "./Donate.module.css";

class Donate extends React.Component {
  state = {
    currentPage: 8,
    totalCount: 140,
    siblingCount: 1,
    pageSize: 10,
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

  updateCurrentPage = (newPage) => {
    console.log(newPage);
    this.setState({ currentPage: newPage });
  };

  incrementPage = (num) => {
    this.setState({ currentPage: num });
  };

  render() {
    return (
      <div>
        <h1>Donate</h1>
        <h1>Donate</h1>
        <h1>Donate</h1>
        <h1>Donate</h1>
        <h1>Donate</h1>
        <h1>Donate</h1>
        <h1>Donate</h1>

        <TopMobileNavBar page="donate" />
      </div>
    );
  }
}

export default Donate;
