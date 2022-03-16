import React from "react";
import DateComponent from "./date";

class ReportedComment extends React.Component {
  highlighted = () => {
    let obj = this.props.comment ? this.props.comment : this.props.post;
    if (!this.props.highlighted || this.props.highlighted._id !== obj._id) {
      return false;
    } else {
      return true;
    }
  };

  renderReports = () => {
    if (!this.state.highlighed) {
      return null;
    }
    return this.state.highlighted;
  };

  render() {
    const { comment, post } = this.props;
    return (
      <div
        onClick={
          comment
            ? () => this.props.highlightFunc(comment)
            : () => this.props.highlightFunc(post)
        }
        className="reported-comment"
        id={this.highlighted() ? "highlighted-comment" : null}
      >
        {post && <div className="reported-title">{post.title}</div>}

        <div className="reported-username">
          {comment ? comment.username.name : post.username[1]}
        </div>
        <div className="reported-time">
          <DateComponent
            time={comment ? comment.timeCommented : post.timePosted}
          />
        </div>
        <div className="reported-body">
          {comment ? comment.body : post.body}
        </div>
      </div>
    );
  }
}

export default ReportedComment;
