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
      <div>
        <div
          className="md-modal md-effect-1"
          id={this.props.isOpen ? "md-show" : null}
        >
          <div className="md-content" id="reply-modal-content">
            <div className="modal-header">
              <span className="close" onClick={() => this.props.closeModal()}>
                &times;
              </span>
              <h2>Reply</h2>
            </div>
            <div className="modal-body">
              <form className="form">
                <label htmlFor="body" className="label">
                  {this.props.comment
                    ? this.props.comment.body
                    : this.props.post.body}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="body"
                  name="body"
                  placeholder="reply"
                  onChange={(event) =>
                    this.setState({ replyText: event.target.value })
                  }
                ></input>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                onClick={() => console.log(this.saveCommentInDatabase())}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyModal;
