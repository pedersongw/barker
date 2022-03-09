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

  onClick = () => {
    console.log(this.props);
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

  displayBody = () => {
    if (this.props.depth > 5) {
      return (
        <React.Fragment>
          <Link
            to={`/comment/${this.props.comment._id}/${this.props.comment.parentPost}`}
            state={{ comment: this.props.comment }}
          >
            <div>Click to continue thread</div>
          </Link>
          <button
            onClick={() => {
              console.log(this.props.comment._id);
            }}
          >
            button
          </button>
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
    } else if (this.state.user._id == this.props.comment.username._id) {
      return true;
    } else {
      return false;
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
          onClick={() => this.onClick()}
        >
          <div className="comment-body">
            <div className="comment-text">{this.displayBody()}</div>
            <div className="comment-by">
              {!comment.deleted && this.props.depth <= 5 && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>
            {!comment.deleted && this.props.depth <= 5 && (
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
        {this.props.depth <= 5 && nestedComments}
      </div>
    );
  }
}

export default Comment;
