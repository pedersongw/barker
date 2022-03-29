import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import TopMobileNavBar from "./TopMobileNavBar";

class Login extends React.Component {
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
      <div id="create-user-wrapper">
        <h1>Log In</h1>
        <h3>{this.state.errorMessage ? this.state.errorMessage : null}</h3>
        <TopMobileNavBar />
        <div id="create-user-form">
          <form className="user-form" id="login-form">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(event) => this.onEmailChange(event)}
            ></input>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(event) => this.onPasswordChange(event)}
            ></input>
          </form>
          <div id="create-user-submit">
            <button type="submit" onClick={() => this.onLogin()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
