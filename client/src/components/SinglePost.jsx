import React from "react";
import Comment from "./comment";
import { config } from "../URLs.jsx";
import axios from "axios";

class SinglePost extends React.Component {
  state = {
    reply: "",
  };

  renderCommentsInListGroup = () => {
    return this.props.comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          openReplyModal={this.props.openReplyModal}
          id={comment._id}
          comment={comment}
          parentPost={comment.parentPost}
        />
      );
    });
  };

  saveCommentInDatabase = async () => {
    const { post } = this.props;
    const commentObj = {
      body: this.state.reply,
      timeCommented: new Date(),
      parentPost: post._id,
      parentComment: null,
    };
    try {
      const response = await axios.post(config + "/api/comments", commentObj);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { post } = this.props;
    return (
      <div className="viewed-post-wrapper">
        <div className="viewed-post-body">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button
            type="submit"
            className="open-reply-button"
            onClick={() => this.props.openReplyModal(this.props.post)}
          >
            Reply
          </button>
        </div>

        <div>{this.renderCommentsInListGroup()}</div>
      </div>
    );
  }
}

export default SinglePost;
