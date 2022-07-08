import React from "react";
import styles from "./DesktopLogin.module.css";

import { config } from "../../URLs.jsx";
import axios from "axios";

class DesktopLogin extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    whichPanel: "login",
    message: "",
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onEmailChange = (event) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
    this.setState({ email: event.target.value });
  };

  onUsernameChange = (event) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
    this.setState({ password: event.target.value });
  };

  onLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const postObj = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      this.setState({ message: "All fields must be filled" });
      return;
    }
    try {
      const response = await axios.post(config + "/api/auth", postObj);
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location.reload();
    } catch (error) {
      console.log(error.response.status, error.response.data);
      this.setState({ message: error.response.data.message });
    }
  };

  onCreate = async (event) => {
    event.preventDefault();
    const { email, password, username } = this.state;
    if (!email || !password || !username) {
      this.setState({ message: "All fields must be filled" });
      return;
    }
    const postObj = {
      name: username,
      email: email,
      password: password,
      isAdmin: false,
    };
    try {
      const response = await axios.post(config + "/api/users", postObj);
      this.setState({ message: response.data });
      this.setState({ username: "", password: "", email: "" });
    } catch (error) {
      console.log(error.response.status, error.response.data);
      this.setState({ message: error.response.data });
    }
  };

  linkClicked = (arg) => {
    this.setState({
      whichPanel: arg,
      email: "",
      username: "",
      password: "",
      message: "",
    });
  };

  render() {
    return (
      <div className={styles.outerWrapper}>
        {this.state.whichPanel === "login" && (
          <form
            className={styles.form}
            onSubmit={(event) => this.onSubmit(event)}
          >
            <div className={styles.headers}>
              <h2 className={styles["h2"]}>Login</h2>
              <h5 className={styles["h5"]}>or</h5>
              <h5 className={styles["h5"]}>
                <u
                  className={styles.create}
                  onClick={() => this.linkClicked("create")}
                >
                  Create
                </u>
              </h5>
            </div>

            <input
              className={styles.input}
              type="text"
              placeholder="email"
              onChange={(event) => this.onEmailChange(event)}
              value={this.state.email}
            ></input>
            <input
              className={styles.input}
              type="password"
              placeholder="password"
              onChange={(event) => this.onPasswordChange(event)}
              value={this.state.password}
            ></input>
            {this.state.message && (
              <div
                type="button"
                className={styles.errButton}
                onClick={(event) => event.stopPropagation()}
              >
                {this.state.message}
              </div>
            )}
            {!this.state.message && (
              <button
                type="submit"
                className={styles.button}
                onClick={(event) => this.onLogin(event)}
              >
                Login
              </button>
            )}
          </form>
        )}
        {this.state.whichPanel === "create" && (
          <form
            className={styles.form}
            onSubmit={(event) => this.onSubmit(event)}
          >
            <div className={styles.headers}>
              <h2 className={styles["h2"]}>Create</h2>
              <h5 className={styles["h5"]}>or</h5>
              <h5 className={styles["h5"]}>
                <u
                  className={styles.create}
                  onClick={() => this.linkClicked("login")}
                >
                  Login
                </u>
              </h5>
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="username"
              onChange={(event) => this.onUsernameChange(event)}
              value={this.state.username}
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="email"
              onChange={(event) => this.onEmailChange(event)}
              value={this.state.email}
            ></input>
            <input
              className={styles.input}
              type="password"
              placeholder="password"
              onChange={(event) => this.onPasswordChange(event)}
              value={this.state.password}
            ></input>
            {this.state.message && (
              <div
                type="button"
                className={styles.errButton}
                onClick={(event) => event.stopPropagation()}
              >
                {this.state.message}
              </div>
            )}
            {!this.state.message && (
              <button
                type="submit"
                className={styles.button}
                onClick={(event) => this.onCreate(event)}
              >
                Create
              </button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default DesktopLogin;
