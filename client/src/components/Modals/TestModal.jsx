import React from "react";
import styles from "./TestModal.module.css";

class TestModal extends React.Component {
  render() {
    return (
      <div
        className={styles.blurFilter}
        id={this.props.isOpen ? styles.blurOpen : null}
        onClick={() => this.props.closeModal()}
      >
        <div
          className={styles.formDiv}
          onClick={(event) => event.stopPropagation()}
        >
          <form className={styles.form}>
            <h2 className={styles["h2"]}>Create Post</h2>
            <input
              placeholder="Title your post"
              className={styles.input}
            ></input>
            <textarea
              placeholder="What's on your mind?"
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TestModal;
