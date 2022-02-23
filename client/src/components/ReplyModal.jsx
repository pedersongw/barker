import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import { FaReply } from "react-icons/fa";

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
            ? "md-modal modal-mobile"
            : "md-modal modal-desktop"
        }
        id={this.props.isOpen ? "md-show" : null}
      >
        <div className="md-content" id="reply-modal-content">
          <div className="modal-header">
            <h2 className="modal-header-text">Reply</h2>
            {this.state.errorMessage ? (
              <div className="modal-error">{this.state.errorMessage}</div>
            ) : null}
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
            <form className="form">
              <label htmlFor="body" className="label"></label>
              <textarea
                type="text"
                className="reply-form-input"
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
                className="submit-reply-btn"
                type="submit"
                onClick={() => this.onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <div className="footer-text">
              {this.props.comment ? this.returnFooterText() : null}
            </div>
            <div className="footer-icon">
              <FaReply />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyModal;
