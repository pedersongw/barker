import React from "react";

class MobileReplyMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="blur-filter"
          id={this.props.open ? "blur-filter" : null}
        ></div>
        <div
          className={
            this.props.open === true ? "nav-mobile open" : "nav-mobile"
          }
          id="nav-mobile"
        >
          <div
            className="mobile-nav-button"
            onClick={() => this.props.delete()}
          >
            Delete
          </div>
          <div
            className="mobile-nav-button"
            id="comment-report-button"
            onClick={() => this.props.openReportModal()}
          >
            Report
          </div>
          <div
            className="mobile-nav-button"
            onClick={() => this.props.openReplyModal()}
          >
            Reply
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MobileReplyMenu;
