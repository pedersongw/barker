import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

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
      <div style={{ marginLeft: "25px", marginTop: "10px" }}>
        <div>
          {this.props.comment.body}
          <div>
            <button
              type="submit"
              className="open-reply-button"
              onClick={() => this.props.openReplyModal(this.props.comment)}
            >
              Reply
            </button>
          </div>
        </div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;
