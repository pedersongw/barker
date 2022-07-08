import React from "react";
import styles from "./PleaseLogin.module.css";

class PleaseLogin extends React.Component {
  onLoginClick = () => {
    if (this.props.width > 800) {
      this.props.close();
      window.location = "/forum";
    } else {
      this.props.handleMobile();
    }
  };

  render() {
    return (
      <div
        className={
          this.props.width < 800 ? styles.wrapperMobile : styles.wrapperDesktop
        }
        id={
          this.props.isOpen
            ? this.props.width < 800
              ? styles.mobileOpen
              : styles.desktopOpen
            : null
        }
      >
        <div
          className={styles.textDiv}
          id={this.props.isOpen ? styles.textDivOpen : null}
        >
          <h3 className={styles["h3"]}>Please Login</h3>

          <button
            className={styles.button}
            id="login"
            onClick={() => this.onLoginClick()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default PleaseLogin;
