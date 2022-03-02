import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

class LoginModal extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ errorMessage: "" });
  };

  onLogin = async () => {
    const { email, password } = this.state;
    const postObj = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(config + "/api/auth", postObj);
      console.log(response);
      localStorage.setItem("token", response.data);
      this.props.closeLoginModal();
      window.location = "/forum/1/all";
    } catch (error) {
      console.log(error);
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
        <div className="md-content" id="login-modal-content">
          <div className="modal-header">
            {!this.state.errorMessage && (
              <h2 className="modal-header-text">Log In</h2>
            )}

            {this.state.errorMessage ? (
              <div className="modal-error">{this.state.errorMessage}</div>
            ) : null}
            <span
              className="close"
              onClick={() => this.props.closeLoginModal()}
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
              onClick={() => this.onLogin()}
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

export default LoginModal;
