import React from "react";
import DateComponent from "../Utilities/date";
import styles from "./Post.module.css";

class Post extends React.Component {
  onClick = () => {
    sessionStorage.setItem("postId", this.props.id);
    window.location.href = "/post";
  };

  displayLimitedBody = () => {
    let { body } = this.props;
    if (body.length > 400) {
      return (
        <p className={styles.body}>
          {body.slice(0, 400)}
          <span className={styles.seeMore}>...see more</span>
        </p>
      );
    } else {
      return <p className={styles.body}>{body}</p>;
    }
  };

  render() {
    const { body, likes, timePosted, username, title } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.card} onClick={() => this.onClick()}>
          <h4 className={styles.username}>
            <b>{username[1]}</b>
          </h4>
          <h3 className={styles.title}>{title}</h3>
          {this.displayLimitedBody()}
          <div className={styles.time}>
            <DateComponent time={timePosted} />
          </div>

          <small className={styles.likes}>
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
