import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

export default class NewUserModal extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({ email: "" });
      this.setState({ password: "" });
      this.setState({ name: "" });
    }
  }

  onUsernameChange = (event) => {
    this.setState({ name: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onCreateUser = async () => {
    const { email, password, name } = this.state;
    if (!email || !password || !name) {
      this.setState({ errorMessage: "All fields must be filled" });
      return;
    }
    const postObj = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(config + "/api/users", postObj);
      console.log(response);
      this.props.closeUserModal();
      window.location = "/forum";
    } catch (error) {
      console.log(error.response.status, error.response.data);
      this.setState({
        errorMessage: error.response.data,
      });
    }
  };

  render() {
    return (
      <div>
        <div
          className={
            this.props.width < 800
              ? "md-modal modal-mobile"
              : "md-modal modal-desktop"
          }
          id={this.props.isOpen ? "md-show" : null}
        >
          <div className="md-content" id="user-modal-content">
            <div className="modal-header">
              {!this.state.errorMessage && (
                <h2 className="modal-header-text">Create New User</h2>
              )}

              {this.state.errorMessage ? (
                <div className="modal-error">{this.state.errorMessage}</div>
              ) : null}
              <span
                className="close"
                onClick={() => this.props.closeUserModal()}
              >
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
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="username"
                  name="username"
                  placeholder="username"
                  onChange={(event) => this.onUsernameChange(event)}
                ></input>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={(event) => this.onEmailChange(event)}
                ></input>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={(event) => this.onPasswordChange(event)}
                ></input>
              </form>
              <button
                className="submit-reply-btn"
                type="submit"
                onClick={() => this.onCreateUser()}
              >
                Submit
              </button>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}
