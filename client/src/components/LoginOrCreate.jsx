import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";

class LogInOrCreate extends React.Component {
  state = {
    tab: "login",
    username: null,
    email: null,
    password: null,
    errorMessage: null,
  };

  tabClick = (event) => {
    event.target.className === "tab-left"
      ? this.setState({ tab: "login" })
      : this.setState({ tab: "create" });
    this.setState({ username: null });
    this.setState({ email: null });
    this.setState({ password: null });
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onCreate = async (event) => {
    event.preventDefault();
    console.log(this.state);
    const { email, password, username } = this.state;
    if (!email || !password || !username) {
      this.setState({ errorMessage: "All fields must be filled" });
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
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/forum/1/all";
    } catch (error) {
      console.log(error.response.status, error.response.data);
      this.setState({ errorMessage: error.response.data });
    }
  };

  onLogin = async (event) => {
    event.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;
    const postObj = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      this.setState({ errorMessage: "All fields must be filled" });
      return;
    }
    try {
      const response = await axios.post(config + "/api/auth", postObj);
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location = "/forum/1/all";
    } catch (error) {
      console.log(error.response.status, error.response.data);
      this.setState({ errorMessage: error.response.data });
    }
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-or-create">
          <div
            className="login"
            id={this.state.tab === "login" ? "login-tab" : null}
          >
            <div className="tab-left" onClick={(event) => this.tabClick(event)}>
              Login
            </div>
            <div
              className="tab-right"
              onClick={(event) => this.tabClick(event)}
            >
              Sign Up
            </div>
            <form onSubmit={this.onLogin}>
              <input
                className="login-input"
                type="text"
                name="email"
                onChange={(event) => this.onEmailChange(event)}
              ></input>
              <input
                className="login-input"
                type="password"
                name="password"
                onChange={(event) => this.onPasswordChange(event)}
              ></input>
              <button type="submit">Login</button>
            </form>
          </div>
          <div
            className="create"
            id={this.state.tab === "create" ? "create-tab" : null}
          >
            <div className="tab-left" onClick={(event) => this.tabClick(event)}>
              Login
            </div>
            <div
              className="tab-right"
              onClick={(event) => this.tabClick(event)}
            >
              Sign Up
            </div>
            <form onSubmit={this.onCreate}>
              <input
                className="login-input"
                type="text"
                name="username"
                onChange={(event) => this.onUsernameChange(event)}
              ></input>
              <input
                className="login-input"
                type="text"
                name="email"
                onChange={(event) => this.onEmailChange(event)}
              ></input>
              <input
                className="login-input"
                type="password"
                name="password"
                onChange={(event) => this.onPasswordChange(event)}
              ></input>
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInOrCreate;
