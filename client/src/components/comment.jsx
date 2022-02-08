import React from "react";
import { config } from "../URLs.jsx";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";

class Comment extends React.Component {
  state = {
    isOpen: false,
    user: "",
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    this.setState({ user: user });
  }

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

  updateDeletedComment = async () => {
    const { comment } = this.props;
    let commentID = { _id: comment._id };
    try {
      const response = await axios.post(
        config + "/api/comments/delete",
        commentID
      );
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
    let container = document.getElementById(this.props.comment._id);
    if (!container.contains(event.target)) {
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

    let { comment } = this.props;

    return (
      <div className="comment-wrapper">
        <div
          className="comment"
          id={comment.deleted ? "deleted-comment" : null}
        >
          <div className="comment-body">
            <div className="comment-text">
              {comment.deleted ? (
                <div>Comment has been deleted</div>
              ) : (
                comment.body
              )}
            </div>
            <div className="comment-by">
              {!comment.deleted && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>
            {!comment.deleted && (
              <div
                className="ellipsis"
                id={this.props.comment._id}
                onClick={() => this.onClick()}
              >
                <FaEllipsisH className="react-icon" />
                <div
                  className="comment-menu"
                  id={this.state.isOpen ? "comment-menu-visible" : null}
                >
                  <button
                    className="comment-button"
                    onClick={() =>
                      this.props.openReplyModal(this.props.comment)
                    }
                  >
                    Reply
                  </button>
                  {this.state.user._id == this.props.comment.username._id && (
                    <button
                      className="comment-button"
                      onClick={() => this.updateDeletedComment()}
                    >
                      Delete
                    </button>
                  )}

                  <button className="comment-button">Report</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;
