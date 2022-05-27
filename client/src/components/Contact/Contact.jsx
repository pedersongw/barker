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

  constructor(props) {
    super(props);
  }

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

  changeStaging = (direction) => {
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
      noClick,
    } = this.state;
    if (noClick) {
      return;
    }
    this.setState({ noClick: true });
    setTimeout(() => {
      this.setState({ noClick: false });
    }, 1100);
    if (staging === 1) {
      if (direction === "left") {
        this.setState({
          oneClass: styles.imgHide,
          twoId: styles.twoToOne,
          threeId: styles.threeToTwo,
          fourClass: styles.imgThree,
          staging: 4,
        });
        setTimeout(
          () =>
            this.setState({
              twoClass: styles.imgOne,
              twoId: null,
              threeClass: styles.imgTwo,
              threeId: null,
            }),

          1000
        );
      } else {
        this.setState({
          twoId: styles.twoToThree,
          threeClass: styles.imgHide,
          oneId: styles.oneToTwo,
          fourClass: styles.imgOne,
          staging: 2,
        });
        setTimeout(() => {
          this.setState({
            twoClass: styles.imgThree,
            twoId: null,
            oneClass: styles.imgTwo,
            threeId: null,
          });
        }, 1000);
      }
    } else if (staging === 2) {
      if (direction === "left") {
        this.setState({
          oneId: styles.twoToOne,
          twoId: styles.threeToTwo,
          threeClass: styles.imgThree,
          fourClass: styles.imgHide,
          staging: 1,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgOne,
            oneId: null,
            twoClass: styles.imgTwo,
            twoId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneId: styles.twoToThree,
          twoClass: styles.imgHide,
          threeClass: styles.imgOne,
          fourId: styles.oneToTwo,
          staging: 3,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgThree,
            oneId: null,
            fourClass: styles.imgTwo,
            fourId: null,
          });
        }, 1000);
      }
    } else if (staging === 3) {
      if (direction === "left") {
        this.setState({
          oneId: styles.threeToTwo,
          twoClass: styles.imgThree,
          threeClass: styles.imgHide,
          fourId: styles.twoToOne,
          staging: 2,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgTwo,
            oneId: null,
            fourClass: styles.imgOne,
            fourId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneClass: styles.imgHide,
          twoClass: styles.imgOne,
          threeId: styles.oneToTwo,
          fourId: styles.twoToThree,
          staging: 4,
        });
        setTimeout(() => {
          this.setState({
            threeClass: styles.imgTwo,
            threeId: null,
            fourClass: styles.imgThree,
            fourId: null,
          });
        }, 1000);
      }
    } else {
      if (direction === "left") {
        this.setState({
          oneClass: styles.imgThree,
          twoClass: styles.imgHide,
          threeId: styles.twoToOne,
          fourId: styles.threeToTwo,
          staging: 3,
        });
        setTimeout(() => {
          this.setState({
            threeClass: styles.imgOne,
            threeId: null,
            fourClass: styles.imgTwo,
            fourId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneClass: styles.imgOne,
          twoId: styles.oneToTwo,
          threeId: styles.twoToThree,
          fourClass: styles.imgHide,
          staging: 1,
        });
        setTimeout(() => {
          this.setState({
            twoClass: styles.imgTwo,
            twoId: null,
            threeClass: styles.imgThree,
            threeId: null,
          });
        }, 1000);
      }
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
          <div id={styles.one} onClick={() => this.changeStaging("left")}>
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
          <div id={styles.three} onClick={() => this.changeStaging("right")}>
            Right
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
