import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";
import styles from "./Verify.module.css";
import logo from "../../images/logo.png";

class Verify extends React.Component {
  state = {
    message: "Confirming Email...",
    status: null,
  };

  async componentDidMount() {
    window.addEventListener("keydown", () => console.log(this.state));
    let confirmationCode = { confCode: this.props.code };
    try {
      const response = await axios.post(
        config + "/api/verify",
        confirmationCode
      );
      this.setState({ message: response.data, status: response.status });
      setTimeout(() => (window.location = "/forum/1/all"), 4000);
    } catch (error) {
      this.setState({ message: error.response.data.message });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", () => console.log(this.state));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.centerDiv}>
          <h1 className={styles["h1"]}>{this.state.message}</h1>
          <img className={styles.logo} alt="Barker Field logo" src={logo}></img>
        </div>
      </div>
    );
  }
}

export default Verify;
