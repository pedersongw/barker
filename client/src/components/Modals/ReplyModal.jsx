import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import { FaReply } from "react-icons/fa";
import styles from "./ReplyModal.module.css";

class ReplyModal extends React.Component {
  state = {
    replyText: "",
    errorMessage: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({ replyText: "" });
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.props.comment));
  }

  saveCommentInDatabase = async () => {
    let commentObj = {
      body: this.state.replyText,
      timeCommented: new Date(),
      username: this.props.user,
      parentPost: this.props.comment
        ? this.props.comment.parentPost
        : this.props.post._id,
      parentComment: this.props.comment ? this.props.comment._id : null,
    };
    try {
      const response = await axios.post(config + "/api/comments", commentObj);
      console.log(response);
      this.props.closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  returnFooterText = () => {
    let body = this.props.comment
      ? this.props.comment.body
      : this.props.post.body;
    if (!body) {
      return null;
    } else return body.length < 90 ? body : body.slice(0, 90) + "...";
  };

  onTextareaChange = (event) => {
    this.setState({ replyText: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onSubmit = () => {
    if (this.state.replyText.length < 1) {
      this.setState({ errorMessage: "Reply cannot be empty" });
    } else {
      this.saveCommentInDatabase();
      window.location.reload();
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
        <div className={styles.content} id="reply-modal-content">
          <div className={styles.modalHeader}>
            <h2 className={styles.modalHeaderText}>Reply</h2>
            {this.state.errorMessage ? (
              <div className={styles.modalError}>{this.state.errorMessage}</div>
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
            <form className={styles.form}>
              <label htmlFor="body" className="label"></label>
              <textarea
                type="text"
                className={styles.replyFormInput}
                id="body"
                name="body"
                value={this.state.replyText}
                placeholder="Write your reply here..."
                maxLength="300"
                onChange={(event) => this.onTextareaChange(event)}
              ></textarea>
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
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.footerText}>
              {this.props.comment ? this.returnFooterText() : null}
            </div>
            <div className={styles.footerIcon}>
              <FaReply />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyModal;
