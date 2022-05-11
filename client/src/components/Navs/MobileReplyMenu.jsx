import React from "react";
import styles from "./MobileReplyMenu.module.css";

class MobileReplyMenu extends React.Component {
  reportClicked = () => {
    console.log("report clicked");
    this.props.openReportModal();
  };
  deleteClicked = () => {
    console.log("delete clicked");
    this.props.delete();
  };
  replyClicked = () => {
    console.log("reply clicked");
    this.props.openReplyModal();
  };
  menuClicked = () => {
    this.props.close();
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={styles.blurFilter}
          id={this.props.open ? styles.blurFilter : null}
          onClick={() => this.menuClicked()}
        ></div>
        <div
          className={
            this.props.open === true
              ? `${styles.navMobile} ${styles.navMobileOpen}`
              : styles.navMobile
          }
          id="nav-mobile"
          onClick={() => this.menuClicked()}
        >
          <div
            className={styles.mobileNavButton}
            onClick={() => this.deleteClicked()}
          >
            Delete
          </div>
          <div
            className={styles.mobileNavButton}
            id="comment-report-button"
            onClick={(event) => this.reportClicked()}
          >
            Report
          </div>
          <div
            className={styles.mobileNavButton}
            onClick={() => this.replyClicked()}
          >
            Reply
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MobileReplyMenu;
