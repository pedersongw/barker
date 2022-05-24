import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import styles from "./contact.module.css";

class Contact extends React.Component {
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
        <TopMobileNavBar />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <div className={styles.messageWrapper}>
          <h1 className={styles.h1}>This page intentionally left blank</h1>
        </div>
      </div>
    );
  }
}

export default Contact;
