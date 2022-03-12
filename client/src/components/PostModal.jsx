import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

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
            ? "md-modal modal-mobile"
            : "md-modal modal-desktop"
        }
        id={this.props.isOpen ? "md-show" : null}
      >
        <div className="md-content" id="post-modal-content">
          <div className="modal-header">
            {!this.state.errorMessage && (
              <h2 className="modal-header-text">Create New Post</h2>
            )}

            {this.state.errorMessage ? (
              <div className="modal-error">{this.state.errorMessage}</div>
            ) : null}
            <span className="close" onClick={() => this.props.closePostModal()}>
              &times;
            </span>
          </div>
          <div
            className="modal-body"
            id={
              this.props.width < 800
                ? "modal-body-mobile"
                : "modal-body-desktop"
            }
          >
            <form className="form">
              <label htmlFor="title" className="label">
                title
              </label>
              <input
                type="text"
                className="form-input"
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
                className="form-input"
                id="body"
                name="body"
                value={this.state.body}
                placeholder="Body"
                maxLength="300"
                onChange={(event) => this.onBodyChange(event)}
              ></textarea>
            </form>
            <button
              className="submit-reply-btn"
              type="submit"
              onClick={() => this.onSubmit()}
            >
              Submit
            </button>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    );
  }
}
