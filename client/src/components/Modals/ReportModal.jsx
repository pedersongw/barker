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

  componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.props));
  }

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

  onSubmit = async (event) => {
    event.preventDefault();
    const { selectedOption, otherText } = this.state;
    if (selectedOption === "Other" && !otherText) {
      this.setState({ errorMessage: "Text input cannot be empty" });
      return;
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

  renderButtonText = () => {
    if (this.props.reported) {
      return "Already Reported";
    } else if (this.state.errorMessage) {
      return this.state.errorMessage;
    } else {
      return "Submit";
    }
  };

  render() {
    const { comment, post, width, isOpen } = this.props;
    return (
      <React.Fragment>
        <div
          className={styles.blurFilter}
          id={this.props.isOpen ? styles.blurOpen : null}
        ></div>
        <div
          className={styles.formDiv}
          id={this.props.isOpen ? styles.formDivOpen : null}
          onMouseDown={() => this.props.closeModal()}
        >
          <form
            className={styles.form}
            onSubmit={(event) => this.onSubmit(event)}
          >
            {comment && (
              <div
                className={
                  comment
                    ? width < 800
                      ? `${styles.comment} ${styles.mobileComment}`
                      : styles.comment
                    : null
                }
                id={styles[`depth-${comment.depth}`]}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className={styles.commentBody}>
                  {comment ? comment.body : null}
                </div>
                <div className={styles.commentBy}>
                  <small>by {comment ? comment.username.name : null}</small>
                </div>
              </div>
            )}
            {isOpen && !comment && (
              <div className={styles.post}>{post.body}</div>
            )}
            <div className={styles.formGridWrapper}>
              <div
                className={styles.radioWrapper}
                id={
                  this.state.selectedOption !== "Other"
                    ? styles.unchecked
                    : styles.checked
                }
              >
                <div
                  className={styles.radioDiv}
                  id={
                    this.state.selectedOption !== "Other"
                      ? styles.radioDivUnchecked
                      : null
                  }
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <label className={styles.label}>
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
                <div
                  className={styles.radioDiv}
                  id={
                    this.state.selectedOption !== "Other"
                      ? styles.radioDivUnchecked
                      : null
                  }
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <label className={styles.label}>
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
                <div
                  className={styles.radioDiv}
                  id={
                    this.state.selectedOption !== "Other"
                      ? styles.radioDivUnchecked
                      : null
                  }
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <label className={styles.label}>
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
                <div
                  className={styles.radioDiv}
                  id={
                    this.state.selectedOption !== "Other"
                      ? styles.radioDivUnchecked
                      : null
                  }
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <label className={styles.label}>
                    <input
                      className={styles.radio}
                      type="radio"
                      value="Other"
                      checked={this.state.selectedOption === "Other"}
                      onChange={(event) => this.onValueChange(event)}
                    />
                    Other
                  </label>
                </div>
              </div>
              {this.state.selectedOption === "Other" && (
                <div className={styles.otherInput}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Detailed description here..."
                    onMouseDown={(event) => event.stopPropagation()}
                    onChange={(event) => this.otherTextChange(event)}
                    maxLength={150}
                  ></textarea>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={
                this.props.reported
                  ? styles.errButton
                  : this.state.errorMessage
                  ? styles.errButton
                  : styles.button
              }
              onMouseDown={(event) => event.stopPropagation()}
            >
              {this.renderButtonText()}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ReportModal;
