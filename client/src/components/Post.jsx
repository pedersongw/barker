import React from "react";
import DateComponent from "./date";

class Post extends React.Component {
  render() {
    const { body, likes, timePosted, username, title } = this.props;

    return (
      <div className="post-container">
        <div className="post-card">
          <h4 className="post-username">
            <b>{username[1]}</b>
          </h4>
          <h3 className="post-title">{title}</h3>
          <p className="post-body">{body}</p>
          <div className="post-time">
            <DateComponent time={timePosted} />
          </div>

          <small className="post-likes">
            {likes.length.toString() +
              (likes.length === 1
                ? " person liked this"
                : " people liked this")}
          </small>
        </div>
      </div>
    );
  }
}

export default Post;
