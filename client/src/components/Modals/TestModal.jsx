import React from "react";
import styles from "./TestModal.module.css";

class TestModal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.props));
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", () => console.log(this.props));
  }

  render() {
    const { comment } = this.props;
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
            <h2 className={styles["h2"]}>Reply</h2>
            <div
              className={
                this.props.width < 800
                  ? `${styles.comment} ${styles.mobileComment}`
                  : styles.comment
              }
              id={styles[`depth-${comment.depth}`]}
            >
              <div className={styles.commentBody}>
                {comment ? comment.body : null}
              </div>
              <div className={styles.commentBy}>
                <small>by {comment ? comment.username.name : null}</small>
              </div>
            </div>
            <textarea
              placeholder="Reply here..."
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
