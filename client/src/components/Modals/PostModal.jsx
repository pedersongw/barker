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

  onSubmit = (event) => {
    const { title, body } = this.state;
    event.preventDefault();
    if (title.length < 1 || body.length < 1) {
      this.setState({ errorMessage: "Fill both fields" });
      return;
    } else if (title.length < 5 && title.length > 0) {
      this.setState({ errorMessage: "Title too short" });
      return;
    } else if (body.length < 5 && body.length > 0) {
      this.setState({ errorMessage: "Post too short" });
      return;
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
      this.props.closeModal();
      window.location.reload();
    } catch (error) {
      console.log(error);
      this.props.closeModal();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={styles.blurFilter}
          id={this.props.isOpen ? styles.blurOpen : null}
        ></div>
        <div
          className={styles.formDiv}
          id={
            this.props.isOpen
              ? this.props.width < 800
                ? styles.mobileFormDivOpen
                : styles.formDivOpen
              : null
          }
          onMouseDown={() => this.props.closeModal()}
        >
          <form
            className={styles.form}
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={(event) => this.onSubmit(event)}
          >
            <h2 className={styles["h2"]}>Create Post</h2>
            <input
              placeholder="Title your post"
              className={styles.input}
              type="text"
              name="title"
              value={this.state.title}
              maxLength="50"
              onChange={(event) => this.onTitleChange(event)}
            ></input>
            <textarea
              placeholder="What's on your mind?"
              className={styles.textarea}
              maxLength={3000}
              type="text"
              name="body"
              value={this.state.body}
              onChange={(event) => this.onBodyChange(event)}
            ></textarea>
            <button
              type="submit"
              className={
                this.state.errorMessage ? styles.errButton : styles.button
              }
            >
              {this.state.errorMessage ? this.state.errorMessage : "Submit"}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
