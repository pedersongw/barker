import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";

class Comment extends React.Component {
  state = {
    isOpen: false,
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
    if (this.state.isOpen) {
      window.removeEventListener("click", this.handleClickOutsideCommentMenu);
      this.setState({ isOpen: false });
    } else {
      window.addEventListener("click", this.handleClickOutsideCommentMenu);
      this.setState({ isOpen: true });
    }
  };

  handleClickOutsideCommentMenu = (event) => {
    console.log(event.target);
    let container = document.getElementById(this.props.comment._id);
    if (
      event.target.className !== "comment-button" &&
      event.target.className !== "ellipsis" &&
      event.target.className.baseVal !== "react-icon" &&
      !container.contains(event.target)
    ) {
      console.log("clicked outside comment-menu");
      window.removeEventListener("click", this.handleClickOutsideCommentMenu);
      this.setState({ isOpen: false });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutsideCommentMenu);
  }

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
          <div className="comment-body">
            <div className="comment-text">{this.props.comment.body}</div>
            <div className="comment-by">
              {this.props.comment.username && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>

            <div className="ellipsis" onClick={() => this.onClick()}>
              <FaEllipsisH className="react-icon" id={this.props.comment._id} />
              <div
                className="comment-menu"
                id={this.state.isOpen ? "comment-menu-visible" : null}
              >
                <button className="comment-button">Reply</button>
                <button className="comment-button">Delete</button>
                <button className="comment-button">Report</button>
              </div>
            </div>
          </div>
        </div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;
