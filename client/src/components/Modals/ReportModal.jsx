import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import styles from "./ReportModal.module.css";

class ReportModal extends React.Component {
  state = {
    selectedOption: null,
    otherText: "",
    errorMessage: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ otherText: "" });
      this.setState({ selectedOption: null });
      this.setState({ errorMessage: "" });
    }
  }

  onValueChange(event) {
    this.setState({ errorMessage: "" });
    if (event.target.value !== "Other") {
      this.setState({ otherText: "" });
    }
    this.setState({
      selectedOption: event.target.value,
    });
  }

  otherTextChange = (event) => {
    this.setState({ otherText: event.target.value });
    if (event.target.value.length === 0) {
      this.setState({ errorMessage: "Text input cannot be empty" });
    } else {
      this.setState({ errorMessage: "" });
    }
  };

  onSubmit = async () => {
    const { selectedOption, otherText } = this.state;
    if (selectedOption === "Other" && !otherText) {
      this.setState({ errorMessage: "Text input cannot be empty" });
    }
    const { comment, post, user } = this.props;
    let obj = {
      id: comment ? comment._id : post._id,
      reportObj: {
        user: user,
        selectedOption: selectedOption,
        otherText: otherText,
      },
    };

    try {
      let urlSegment = comment ? "comments" : "posts";
      const response = await axios.post(
        config + `/api/${urlSegment}/report`,
        obj
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div
        className={
          this.props.width < 800
            ? `${styles.modal} ${styles.mobile}`
            : `${styles.modal} ${styles.desktop}`
        }
        id={this.props.isOpen ? styles.show : null}
      >
        <div className={styles.content} id="report-modal-content">
          <div className={styles.modalHeader}>
            <h2 className={styles.modalHeaderText}>Report</h2>
            {this.state.errorMessage ? (
              <div className={styles.modalError}>{this.state.errorMessage}</div>
            ) : null}
            {this.props.reported ? (
              <div className={styles.modalError}>
                You've already reported this
              </div>
            ) : null}
            <span
              className={styles.close}
              onClick={() => this.props.closeModal()}
            >
              &times;
            </span>
          </div>
          <div
            className={styles.modalBody}
            id={
              this.props.width < 800
                ? styles.modalBodyMobile
                : styles.modalBodyDesktop
            }
          >
            {!this.props.reported && (
              <React.Fragment>
                <form id={styles.reportModalForm}>
                  <div className={styles.radioDiv}>
                    <label>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="Hate"
                        checked={this.state.selectedOption === "Hate"}
                        onChange={(event) => this.onValueChange(event)}
                      />
                      Hate
                    </label>
                  </div>
                  <div className={styles.radioDiv}>
                    <label>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="Spam"
                        checked={this.state.selectedOption === "Spam"}
                        onChange={(event) => this.onValueChange(event)}
                      />
                      Spam
                    </label>
                  </div>
                  <div className={styles.radioDiv}>
                    <label>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="Advertising"
                        checked={this.state.selectedOption === "Advertising"}
                        onChange={(event) => this.onValueChange(event)}
                      />
                      Advertising
                    </label>
                  </div>
                  <div className={styles.radioDiv}>
                    <label>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="Other"
                        checked={this.state.selectedOption === "Other"}
                        onChange={(event) => this.onValueChange(event)}
                      />
                      Other
                      {this.state.selectedOption === "Other" && (
                        <input
                          type="text"
                          id="other-input"
                          value={this.state.otherText}
                          onChange={(event) => this.otherTextChange(event)}
                          placeholder="Describe here"
                        ></input>
                      )}
                    </label>
                  </div>
                </form>
                <div className="submit-reply-div">
                  <button
                    className={styles.submitReplyBtn}
                    type="submit"
                    onClick={() => this.onSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.footerIcon}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportModal;
