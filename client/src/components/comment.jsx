import React from "react";

class Comment extends React.Component {
  render() {
    const nestedComments = (this.props.comment.children || []).map(
      (comment) => {
        return <Comment key={comment._id} comment={comment} type="child" />;
      }
    );

    return (
      <div style={{ marginLeft: "25px", marginTop: "10px" }}>
        <div>{this.props.comment.body}</div>
        {nestedComments}
      </div>
    );
  }
}

export default Comment;