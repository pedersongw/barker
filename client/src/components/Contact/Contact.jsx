import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import styles from "./contact.module.css";

import image1 from "../../FundraisingImages/goal1images/image1.jpg";
import image2 from "../../FundraisingImages/goal1images/image2.jpg";
import image3 from "../../FundraisingImages/goal1images/20211002_150840.jpg";
import image4 from "../../FundraisingImages/goal1images/20211002_151239.jpg";
import image21 from "../../FundraisingImages/goal2images/20211002_150515.jpg";
import image22 from "../../FundraisingImages/goal2images/20211002_150601.jpg";
import image23 from "../../FundraisingImages/goal2images/20211002_151607.jpg";
import image31 from "../../FundraisingImages/goal3images/20211002_150715.jpg";
import image32 from "../../FundraisingImages/goal3images/20211002_150744 (2).jpg";

class Contact extends React.Component {
  state = {
    width: window.innerWidth,
    staging: 1,
    oneClass: styles.imgOne,
    twoClass: styles.imgTwo,
    threeClass: styles.imgThree,
    fourClass: styles.imgHide,
    oneId: null,
    twoId: null,
    threeId: null,
    fourId: null,
    noClick: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("keydown", () => console.log(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  leftClicked = () => {
    if (this.state.noClick) {
      return;
    }
    console.log("clicked");
    const {
      staging,
      oneClass,
      twoClass,
      threeClass,
      fourClass,
      oneId,
      twoId,
      threeId,
      fourId,
    } = this.state;
    this.setState({ noClick: true });
    setTimeout(() => {
      this.setState({ noClick: false });
    }, 1000);
    if (staging === 1) {
      this.setState({ twoId: styles.twoToOne });
      this.setState({ oneClass: styles.imgHide });
      this.setState({ threeId: styles.threeToTwo });
      setTimeout(() => {
        this.setState({ twoClass: styles.imgOne });
      }, 1000);
      setTimeout(() => {
        this.setState({ twoId: null });
      }, 1000);
      setTimeout(() => {
        this.setState({ threeClass: styles.imgTwo });
      }, 1000);
      setTimeout(() => {
        this.setState({ threeId: null });
      }, 1000);
      this.setState({ staging: 4 });
    } else if (staging === 2) {
      this.setState({ oneId: styles.twoToOne });
      this.setState({ fourClass: styles.imgHide });
      this.setState({ twoId: styles.threeToTwo });
      setTimeout(() => {
        this.setState({ oneClass: styles.imgOne });
      }, 1000);
      setTimeout(() => {
        this.setState({ oneId: null });
      }, 1000);
      setTimeout(() => {
        this.setState({ twoClass: styles.imgTwo });
      }, 1000);
      setTimeout(() => {
        this.setState({ twoId: null });
      }, 1000);
      this.setState({ staging: 1 });
    }
  };

  rightClicked = () => {
    if (this.state.noClick) {
      return;
    }
    console.log("clicked");
    const {
      staging,
      oneClass,
      twoClass,
      threeClass,
      fourClass,
      oneId,
      twoId,
      threeId,
      fourId,
    } = this.state;
    if (staging === 1) {
      this.setState({ noClick: true });
      setTimeout(() => {
        this.setState({ noClick: false });
      }, 1000);
      this.setState({ twoId: styles.twoToThree });
      this.setState({ threeClass: styles.imgHide });
      this.setState({ oneId: styles.oneToTwo });
      this.setState({ fourClass: styles.imgOne });
      setTimeout(() => {
        this.setState({ twoClass: styles.imgThree });
      }, 1000);
      setTimeout(() => {
        this.setState({ twoId: null });
      }, 1000);
      setTimeout(() => {
        this.setState({ oneClass: styles.imgTwo });
      }, 1000);
      setTimeout(() => {
        this.setState({ threeId: null });
      }, 1000);
      this.setState({ staging: 2 });
    }
  };

  render() {
    const {
      oneClass,
      twoClass,
      threeClass,
      fourClass,
      oneId,
      twoId,
      threeId,
      fourId,
    } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopMobileNavBar />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <div
          className={this.state.width < 800 ? styles.gridMobile : styles.grid}
        >
          <div id={styles.one} onClick={() => this.leftClicked()}>
            Left
          </div>
          <div id={styles.two}>
            <div className={oneClass} id={oneId}>
              <img alt="text" src={image1} className={styles.image} />
            </div>
            <div className={twoClass} id={twoId}>
              <img alt="text" src={image2} className={styles.image} />
            </div>
            <div className={threeClass} id={threeId}>
              <img alt="text" src={image3} className={styles.image} />
            </div>
            <div className={fourClass} id={fourId}>
              <img alt="text" src={image4} className={styles.image} />
            </div>
          </div>
          <div id={styles.three} onClick={() => this.rightClicked()}>
            Right
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
