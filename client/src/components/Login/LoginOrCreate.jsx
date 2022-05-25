import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import styles from "./LoginOrCreate.module.css";

class LogInOrCreate extends React.Component {
  state = {
    tab: "login",
    username: "",
    email: "",
    password: "",
    errorMessage: null,
    width: window.innerWidth,
  };

  constructor(props) {
    super(props);
    this.tabLeft = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  tabClick = (event) => {
    if (event.target === this.tabLeft.current) {
      this.setState({ tab: "login" });
      console.log("login");
      setTimeout(console.log(this.state), 2000);
    } else {
      this.setState({ tab: "create" });
      console.log("create");
    }
    this.setState({ username: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
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
      <div
        className={styles.wrapper}
        id={this.state.width < 800 ? styles.wrapperMobile : null}
      >
        <div className={styles.loginOrCreate}>
          <div
            className={styles.login}
            id={this.state.tab === "login" ? styles.loginTab : null}
          >
            <div className={styles.tabLeft}>Login</div>
            <div
              className={styles.tabRight}
              id={this.state.tab === "login" ? styles.activeTab : null}
              onClick={(event) => this.tabClick(event)}
            >
              Sign Up
            </div>
            <form onSubmit={this.onLogin}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className={styles.loginInput}
                  type="text"
                  name="email"
                  onChange={(event) => this.onEmailChange(event)}
                  value={this.state.email}
                ></input>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  className={styles.loginInput}
                  type="password"
                  name="password"
                  onChange={(event) => this.onPasswordChange(event)}
                  value={this.state.password}
                ></input>
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
          <div
            className={styles.create}
            id={this.state.tab === "create" ? "create-tab" : null}
          >
            <div
              ref={this.tabLeft}
              className={styles.tabLeft}
              id={this.state.tab === "create" ? styles.activeTab : null}
              onClick={(event) => this.tabClick(event)}
            >
              Login
            </div>
            <div className={styles.tabRight}>Sign Up</div>
            <form onSubmit={this.onCreate}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  className={styles.loginInput}
                  type="text"
                  name="username"
                  onChange={(event) => this.onUsernameChange(event)}
                  value={this.state.username}
                ></input>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  className={styles.loginInput}
                  type="text"
                  name="email"
                  onChange={(event) => this.onEmailChange(event)}
                  value={this.state.email}
                ></input>
              </div>

              <div>
                <label htmlFor="password">Password</label>{" "}
                <input
                  className={styles.loginInput}
                  type="password"
                  name="password"
                  onChange={(event) => this.onPasswordChange(event)}
                  value={this.state.password}
                ></input>
              </div>

              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInOrCreate;
