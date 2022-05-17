import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import styles from "./PostModal.module.css";

export default class PostModal extends React.Component {
  state = {
    title: "",
    body: "",
    errorMessage: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({ title: "" });
      this.setState({ body: "" });
    }
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onBodyChange = (event) => {
    this.setState({ body: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onSubmit = () => {
    if (this.state.title.length < 1 || this.state.body.length < 1) {
      this.setState({ errorMessage: "Title and body cannot be empty" });
    } else {
      this.createNewPost();
    }
  };

  createNewPost = async () => {
    const { title, body } = this.state;
    const postObj = {
      title: title,
      body: body,
      timePosted: new Date(),
      username: [this.props.user, this.props.user.name],
      likes: [{ ...this.props.user }],
    };
    try {
      const response = await axios.post(config + "/api/posts", postObj);
      console.log(response);
      this.props.closePostModal();
      window.location = "/forum/1/all";
    } catch (error) {
      console.log(error);
      this.props.closePostModal();
    }
  };
  render() {
    return (
      <div
        className={
          this.props.width < 800
            ? `${styles.modal} ${styles.mobile}`
            : `${styles.modal} ${styles.desktop}`
        }
        id={this.props.isOpen ? styles.show : null}
      >
        <div className={styles.content} id="post-modal-content">
          <div className={styles.modalHeader}>
            {!this.state.errorMessage && (
              <h2 className={styles.modalHeaderText}>Create New Post</h2>
            )}

            {this.state.errorMessage ? (
              <div className={styles.modalError}>{this.state.errorMessage}</div>
            ) : null}
            <span className="close" onClick={() => this.props.closePostModal()}>
              &times;
            </span>
          </div>
          <div
            className={styles.modalBody}
            id={
              this.props.width < 800
                ? styles.modalBodyMobile
                : styles.modalBodyDesktop
            }
          >
            <form className={styles.form}>
              <label htmlFor="title" className="label">
                title
              </label>
              <input
                type="text"
                className={styles.formInput}
                id="title"
                name="title"
                placeholder="Title"
                value={this.state.title}
                maxLength="40"
                onChange={(event) => this.onTitleChange(event)}
              ></input>
              <label htmlFor="body" className="label">
                body
              </label>
              <textarea
                type="text"
                className={styles.formInput}
                id="body"
                name="body"
                value={this.state.body}
                placeholder="Body"
                maxLength="300"
                onChange={(event) => this.onBodyChange(event)}
              ></textarea>
            </form>
            <button
              className={styles.submitReplyBtn}
              type="submit"
              onClick={() => this.onSubmit()}
            >
              Submit
            </button>
          </div>
          <div className={styles.modalFooter}></div>
        </div>
      </div>
    );
  }
}
