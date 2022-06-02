import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import styles from "./HerokuContact.module.css";

import image1 from "../../FundraisingImages/goal1images/image1.jpg";

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
          <div className={styles.grid}>
            <div className={styles.imgDiv}>
              <img alt="image" src={image1} className={styles.img}></img>
            </div>
          </div>
          <h1 className={styles.h1}>This page intentionally left blank</h1>
        </div>
      </div>
    );
  }
}

export default Contact;
