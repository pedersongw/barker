import React from "react";
import { config } from "../URLs.jsx";
import axios from "axios";
import TopMobileNavBar from "./TopMobileNavBar";

class Create extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
  };

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
  render() {
    return (
      <div id="create-user-wrapper">
        <h1>Create New User</h1>
        <h3>{this.state.errorMessage ? this.state.errorMessage : null}</h3>
        <TopMobileNavBar />
        <div id="create-user-form">
          <form className="user-form" id="create-form">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(event) => this.onUsernameChange(event)}
            ></input>
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
          <div className="create-user-submit">
            <button type="submit" onClick={() => this.onCreateUser()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
