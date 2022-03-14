import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  onEllipsisClick = () => {
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
  isAlmostDeep = () => {
    if (this.props.width < 800) {
      return this.props.depth === 3 ? true : false;
    } else {
      return this.props.depth === 5 ? true : false;
    }
  };

  isDeep = () => {
    if (this.props.width < 800) {
      return this.props.depth > 3 ? true : false;
    } else {
      return this.props.depth > 5 ? true : false;
    }
  };

  displayBody = () => {
    if (this.isDeep()) {
      return (
        <React.Fragment>
          <Link
            to={`/comment/${this.props.comment.parentComment}/${this.props.comment.parentPost}`}
            state={{ comment: this.props.comment }}
          >
            <div>Click to continue thread</div>
          </Link>
        </React.Fragment>
      );
    } else if (this.props.comment.deleted) {
      return <div>Comment has been deleted</div>;
    } else {
      return this.props.comment.body;
    }
  };

  isUserOrAdmin = () => {
    if (this.state.user.isAdmin) {
      return true;
    } else if (this.state.user._id === this.props.comment.username._id) {
      return true;
    } else {
      return false;
    }
  };

  determineCommentId = () => {
    if (this.props.comment.deleted) {
      return "deleted-comment";
    } else {
      return "comment-depth-" + this.props.depth.toString();
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
            depth={this.props.depth + 1}
            key={comment._id}
            openReplyModal={this.props.openReplyModal}
            openReportModal={this.props.openReportModal}
            comment={comment}
            type="child"
            width={this.props.width}
          />
        );
      }
    );

    let { comment } = this.props;

    return (
      <div
        className="comment-wrapper"
        id={
          this.props.comment.children.length !== 0
            ? "comment-with-children"
            : null
        }
      >
        <div
          className="comment"
          id={this.determineCommentId()}
          onClick={() =>
            console.log(this.props, this.isAlmostDeep(), this.isDeep())
          }
        >
          <div className="comment-body">
            <div className="comment-text">{this.displayBody()}</div>
            <div className="comment-by">
              {!comment.deleted && !this.isDeep() && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>
            {!comment.deleted && !this.isDeep() && (
              <div
                className="ellipsis"
                id={this.props.comment._id}
                onClick={() => this.onEllipsisClick()}
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
                  {this.isUserOrAdmin() && (
                    <button
                      className="comment-button"
                      onClick={() => this.updateDeletedComment()}
                    >
                      Delete
                    </button>
                  )}

                  <button
                    onClick={() =>
                      this.props.openReportModal(this.props.comment)
                    }
                    className="comment-report-button"
                  >
                    Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {!this.isDeep() && !this.isAlmostDeep() && nestedComments}
        {this.isAlmostDeep() && nestedComments[0]}
      </div>
    );
  }
}

export default Comment;
