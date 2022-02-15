import React from "react";
import Comment from "./comment";
import DateComponent from "./date";

class SinglePost extends React.Component {
  state = {
    reply: "",
  };

  renderCommentsInListGroup = () => {
    return this.props.comments.map((comment) => {
      return (
        <Comment
          clickedComment={this.props.clickedComment}
          depth={0}
          key={comment._id}
          openReplyModal={this.props.openReplyModal}
          id={comment._id}
          comment={comment}
          parentPost={comment.parentPost}
        />
      );
    });
  };

  render() {
    const { post } = this.props;
    return (
      <div className="viewed-post-wrapper">
        <div className="viewed-post">
          <h3 className="viewed-post-title">{post.title}</h3>
          <p className="viewed-post-user">posted by {post.username[1]}</p>
          <p className="viewed-post-body">{post.body}</p>
          <p className="viewed-post-likes">
            {post.likes.length.toString() +
              (post.likes.length === 1
                ? " person liked this"
                : " people liked this")}
          </p>
          <div className="viewed-post-time">
            <DateComponent time={post.timePosted} />
          </div>
          <div className="viewed-post-reply-div">
            <button
              type="submit"
              className="post-reply-button"
              onClick={() => this.props.openReplyModal()}
            >
              Reply
            </button>
          </div>
        </div>

        <div>{this.renderCommentsInListGroup()}</div>
      </div>
    );
  }
}

export default SinglePost;
