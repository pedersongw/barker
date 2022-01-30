import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import { FaReply } from "react-icons/fa";

class Comment extends React.Component {
  saveCommentInDatabase = async () => {
    const { comment } = this.props;
    const commentObj = {
      body: this.state.reply,
      timeCommented: new Date(),
      parentPost: comment.parentPost,
      parentComment: comment._id,
    };
    try {
      const response = await axios.post(config + "/api/comments", commentObj);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const nestedComments = (this.props.comment.children || []).map(
      (comment) => {
        return (
          <Comment
            key={comment._id}
            openReplyModal={this.props.openReplyModal}
            comment={comment}
            type="child"
          />
        );
      }
    );

    return (
      <div className="comment-wrapper">
        <div className="comment">
          <div className="comment-body">{this.props.comment.body}</div>
          <div>
            <button
              className="open-reply-button"
              onClick={() => this.props.openReplyModal(this.props.comment)}
            >
              Reply
            </button>
          </div>
          <small>by {this.props.comment.username.name}</small>
        </div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;
