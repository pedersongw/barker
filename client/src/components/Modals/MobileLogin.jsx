import React from "react";
import styles from "./MobileLogin.module.css";
import { config } from "../../URLs.jsx";
import axios from "axios";

class MobileLogIn extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    message: "",
    whichOpen: "login",
  };

  linkClicked = (arg) => {
    this.setState({ whichOpen: arg });
    this.setState({ username: "", email: "", password: "", message: "" });
  };

  onLogin = async () => {
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

  render() {
    const { isOpen } = this.props;
    return (
      <React.Fragment>
        <div
          className={styles.blurFilter}
          id={this.props.isOpen ? styles.blurOpen : null}
        ></div>
        <div
          className={styles.loginFormDiv}
          id={
            this.props.isOpen
              ? this.state.whichOpen === "login"
                ? styles.loginFormDivOpen
                : null
              : null
          }
          onMouseDown={() => this.props.handle()}
        >
          <form
            className={styles.form}
            onSubmit={(event) => event.preventDefault()}
          >
            <div onMouseDown={(event) => event.stopPropagation()}>
              <h1 className={styles["h1"]}>Log In</h1>
              <h5 className={styles["h5"]}>
                or{" "}
                <u
                  className={styles.link}
                  onClick={() => this.linkClicked("create")}
                >
                  Create User
                </u>
              </h5>
            </div>

            <input
              className={styles.input}
              placeholder="Email"
              type="email"
              name="email"
              onChange={(event) => this.setState({ email: event.target.value })}
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.email}
            ></input>
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              name="password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.password}
            ></input>

            <button
              className={styles.button}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={() => this.onLogin()}
            >
              Submit
            </button>
          </form>
        </div>
        <div
          className={styles.createFormDiv}
          id={
            this.props.isOpen
              ? this.state.whichOpen === "create"
                ? styles.createFormDivOpen
                : null
              : null
          }
          onMouseDown={() => this.props.handle()}
        >
          <form
            className={styles.form}
            onSubmit={(event) => event.preventDefault()}
          >
            <div onMouseDown={(event) => event.stopPropagation()}>
              <h1 className={styles["h1"]}>Create User</h1>
              <h5 className={styles["h5"]}>
                or{" "}
                <u
                  className={styles.link}
                  onClick={() => this.linkClicked("login")}
                >
                  Log In
                </u>
              </h5>
            </div>
            <input
              className={styles.input}
              placeholder="Username"
              type="text"
              name="username"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.username}
            ></input>
            <input
              className={styles.input}
              placeholder="Email"
              type="email"
              name="email"
              onChange={(event) => this.setState({ email: event.target.value })}
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.email}
            ></input>
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              name="password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              onMouseDown={(event) => event.stopPropagation()}
              value={this.state.password}
            ></input>

            <button
              className={styles.button}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => this.onCreate(event)}
            >
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MobileLogIn;
