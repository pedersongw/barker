import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import styles from "./contact.module.css";
import logo from "../../images/logo.png";

class Contact extends React.Component {
  state = {
    width: window.innerWidth,
    oneClicked: 0,
    oneClass: styles.boxOne,
    oneId: null,
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
    const { oneClicked, noClick } = this.state;
    if (noClick) {
      return;
    }
    console.log("clicked");
    if (oneClicked === 0) {
      this.setState({ oneId: styles.boxOneMovedLeft });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxTwo }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 1 });
    } else if (oneClicked === 1) {
      this.setState({ oneId: styles.boxTwoMovedLeft });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxThree }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 2 });
    } else if (oneClicked === 2) {
      this.setState({ oneId: styles.boxThreeMovedLeft });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxOne }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 0 });
    }
  };

  rightClicked = () => {
    const { oneClicked, noClick } = this.state;
    if (noClick) {
      return;
    }
    if (oneClicked === 1) {
      this.setState({ oneId: styles.boxTwoMovedRight });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxOne }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 0 });
    } else if (oneClicked === 2) {
      this.setState({ oneId: styles.boxThreeMovedRight });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxTwo }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 1 });
    } else {
      this.setState({ oneId: styles.boxOneMovedRight });
      this.setState({ noClick: true });
      setTimeout(() => this.setState({ noClick: false }), 1000);
      setTimeout(() => this.setState({ oneClass: styles.boxThree }), 1000);
      setTimeout(() => this.setState({ oneId: null }), 1000);
      this.setState({ oneClicked: 2 });
    }
  };

  render() {
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
          <div id={styles.two}></div>
          <div id={styles.three} onClick={() => this.rightClicked()}>
            Right
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
