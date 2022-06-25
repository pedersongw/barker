import React from "react";
import styles from "./TestModal.module.css";

class TestModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={styles.blurFilter}
          id={this.props.isOpen ? styles.blurOpen : null}
        ></div>
        <div
          className={styles.formDiv}
          id={this.props.isOpen ? styles.formDivOpen : null}
          onMouseDown={() => this.props.closeModal()}
        >
          <form
            className={styles.form}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 className={styles["h2"]}>Create Post</h2>
            <input
              placeholder="Title your post"
              className={styles.input}
            ></input>
            <textarea
              placeholder="What's on your mind?"
              className={styles.textarea}
              maxLength={2000}
            ></textarea>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default TestModal;
