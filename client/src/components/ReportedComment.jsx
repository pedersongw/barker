import React from "react";
import DateComponent from "./date";

class ReportedComment extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  highlighted = () => {
    console.log(this.props);
    if (
      !this.props.highlighted ||
      this.props.highlighted._id != this.props.comment._id
    ) {
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
    const { comment } = this.props;
    return (
      <div
        onClick={() => this.props.highlightFunc(comment)}
        className="reported-comment"
        id={this.highlighted() ? "highlighted-comment" : null}
      >
        <div className="reported-username">{comment.username.name}</div>
        <div className="reported-time">
          <DateComponent time={comment.timeCommented} />
        </div>
        <div className="reported-body">{comment.body}</div>
      </div>
    );
  }
}

export default ReportedComment;
