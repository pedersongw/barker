import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import styles from "./ReplyModal.module.css";

class ReplyModal extends React.Component {
  state = {
    replyText: "",
    errorMessage: "",
  };

  componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.props));
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({ replyText: "", errorMessage: "" });
    }
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

  onTextareaChange = (event) => {
    this.setState({ replyText: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.replyText.length < 1) {
      this.setState({ errorMessage: "Reply cannot be empty" });
    } else {
      this.saveCommentInDatabase();
      window.location.reload();
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
                onMouseDown={(event) => event.stopPropagation()}
                id={styles[`depth-${comment.depth}`]}
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

            <textarea
              placeholder="Reply here..."
              className={styles.textarea}
              onChange={(event) => this.onTextareaChange(event)}
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.replyText}
              maxLength={250}
            ></textarea>
            <button
              type="submit"
              onMouseDown={(event) => event.stopPropagation()}
              className={
                this.state.errorMessage ? styles.errButton : styles.button
              }
            >
              {this.state.errorMessage ? this.state.errorMessage : "Submit"}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ReplyModal;
