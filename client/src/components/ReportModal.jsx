import React from "react";

class ReportModal extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.width < 800
            ? "md-modal modal-mobile"
            : "md-modal modal-desktop"
        }
        id={this.props.isOpen ? "md-show" : null}
      >
        <div className="md-content" id="report-modal-content">
          <div className="modal-header">
            <h2 className="modal-header-text">Report</h2>

            <span className="close" onClick={() => this.props.closeModal()}>
              &times;
            </span>
          </div>
          <div
            className="modal-body"
            id={
              this.props.width < 800
                ? "modal-body-mobile"
                : "modal-body-desktop"
            }
          >
            <p>something</p>
            <p>something</p>
            <p>something</p>
            <p>something</p>
            <p>something</p>
            <p>something</p>
            <p>something</p>
            <div className="submit-reply-div">
              <button
                className="submit-reply-btn"
                type="submit"
                onClick={() => this.onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <div className="footer-icon"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportModal;
