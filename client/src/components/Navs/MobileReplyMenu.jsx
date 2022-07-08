import React from "react";
import styles from "./MobileReplyMenu.module.css";

class MobileReplyMenu extends React.Component {
  reportClicked = (event) => {
    event.stopPropagation();
    console.log("report clicked");
    this.props.openReportModal();
  };
  deleteClicked = (event) => {
    event.stopPropagation();
    if (!this.props.user) {
      this.props.handlePleaseLogin();
      return;
    }
    console.log("delete clicked");
    this.props.delete();
  };
  replyClicked = (event) => {
    event.stopPropagation();
    console.log("reply clicked");
    this.props.openReplyModal();
  };
  menuClicked = () => {
    console.log("menu clicked");
    this.props.close();
  };
  isAdminOrOwner = () => {
    let { comment, user } = this.props;
    if (!comment || !user) {
      return null;
    } else {
      return comment.username._id === user._id || user.isAdmin ? true : false;
    }
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
          {this.isAdminOrOwner() && (
            <div
              className={styles.mobileNavButton}
              onClick={(event) => this.deleteClicked(event)}
            >
              Delete
            </div>
          )}

          <div
            className={styles.mobileNavButton}
            id="comment-report-button"
            onClick={(event) => this.reportClicked(event)}
          >
            Report
          </div>
          <div
            className={styles.mobileNavButton}
            onClick={(event) => this.replyClicked(event)}
          >
            Reply
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MobileReplyMenu;
