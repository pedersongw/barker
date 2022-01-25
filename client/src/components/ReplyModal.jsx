import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

class ReplyModal extends React.Component {
  state = {
    replyText: "",
  };

  saveCommentInDatabase = async () => {
    let commentObj = {
      body: this.state.replyText,
      timeCommented: new Date(),
      parentPost: this.props.comment
        ? this.props.comment.parentPost
        : this.props.post._id,
      parentComment: this.props.comment ? this.props.comment._id : null,
    };
    try {
      const response = await axios.post(config + "/api/comments", commentObj);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="md-modal" id={this.props.isOpen ? "md-show" : null}>
        <div className="md-content" id="reply-modal-content">
          <div className="modal-header">
            <h2 className="modal-header-text">Reply</h2>
            <span className="close" onClick={() => this.props.closeModal()}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="reply">
              <form className="form">
                <label htmlFor="body" className="label"></label>
                <textarea
                  type="text"
                  className="reply-form-input"
                  id="body"
                  name="body"
                  placeholder="Write your reply here..."
                  onChange={(event) =>
                    this.setState({ replyText: event.target.value })
                  }
                ></textarea>
              </form>
            </div>
            <div className="submit-reply">
              <button
                className="reply-submit"
                type="submit"
                onClick={() => console.log(this.saveCommentInDatabase())}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <div className="footer-text">
              {this.props.comment
                ? this.props.comment.body
                : this.props.post.body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyModal;
