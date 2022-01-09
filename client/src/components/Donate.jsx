import React from "react";
import BottomMobileNavBar from "./BottomMobileNavBar";
import Pagination from "./Pagination";

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
    const { currentPage, totalCount, siblingCount, pageSize } = this.state;
    return (
      <div>
        <h1>Donate</h1>
        <Pagination
          currentPage={Number(currentPage)}
          totalCount={Number(totalCount)}
          siblingCount={Number(siblingCount)}
          pageSize={Number(pageSize)}
          updateCurrentPage={this.updateCurrentPage}
          incrementPage={this.incrementPage}
        />
        <button onClick={() => console.log(this.state)}>current page</button>
        <BottomMobileNavBar page="donate" />
      </div>
    );
  }
}

export default Donate;
