import React from "react";
import { config } from "../../URLs.jsx";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Comment.module.css";

class Comment extends React.Component {
  state = {
    isOpen: false,
    user: "",
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = decodeToken(jwt);
      this.setState({ user: user });
    } catch (ex) {
      this.setState({ user: null });
      const jwt = localStorage.getItem("token");

      console.log("no user", jwt);
    }
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

  clickedCommentLink = () => {
    window.location = `/comment/${this.props.comment._id}`;
  };

  displayBody = () => {
    if (this.isDeep()) {
      return (
        <React.Fragment>
          <div
            className={styles.linkToMoreDiv}
            onClick={() => this.clickedCommentLink()}
          >
            Click to continue thread
          </div>
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
            handleMenu={this.props.handleMenu}
          />
        );
      }
    );

    let { comment } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.comment} id={styles[this.determineCommentId()]}>
          <div className={styles.body}>
            {this.isDeep() && (
              <div className={styles.deepText}>{this.displayBody()}</div>
            )}
            {!this.isDeep() && (
              <div className={styles.text}>{this.displayBody()}</div>
            )}
            <div className={styles.by}>
              {!comment.deleted && !this.isDeep() && (
                <small>by {this.props.comment.username.name}</small>
              )}
            </div>
            {!comment.deleted && !this.isDeep() && (
              <div
                className={styles.ellipsis}
                id={this.props.comment._id}
                onClick={() =>
                  this.props.handleMenu(this.props.comment, this.props.depth)
                }
              >
                <FaEllipsisH />
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
