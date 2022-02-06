import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";

class Comment extends React.Component {
  state = {
    isHovered: false,
  };

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

  onClick = () => {
    console.log("just clicked");
    if (this.state.isHovered) {
      this.setState({ isHovered: false });
      console.log("unclicking");
    } else {
      this.setState({ isHovered: true });
      console.log("clicking");
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
        <div
          className="comment"
          id={this.state.isHovered ? "comment-test" : null}
        >
          <div className="comment-body">
            <div className="comment-text">{this.props.comment.body}</div>
            <div className="comment-by">
              {this.props.comment.username && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>

            <div className="ellipsis" onClick={() => this.onClick()}>
              <FaEllipsisH />
              <div
                className="comment-menu"
                id={this.state.isHovered ? "comment-menu-visible" : null}
              ></div>
            </div>
          </div>
        </div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;
