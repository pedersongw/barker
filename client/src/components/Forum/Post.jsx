import React from "react";
import DateComponent from "../Utilities/date";
import styles from "./Post.module.css";

class Post extends React.Component {
  onClick = () => {
    window.location.href = `/post/${this.props.id}`;
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
          <p className={styles.body}>{body}</p>
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
