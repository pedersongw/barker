import React from "react";
import axios from "axios";
import { config } from "../../URLs.jsx";
import styles from "./HerokuContact.module.css";

import TopMobileNavBar from "../Navs/TopMobileNavBar";

class Contact extends React.Component {
  state = {
    width: window.innerWidth,
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
    error: "",
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("click", () => console.log(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { email, firstName, lastName, subject, message } = this.state;

    const postObj = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      subject: subject,
      message: message,
    };

    try {
      const response = await axios.post(config + "/api/contact", postObj);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className={styles.pageWrapper}>
        <TopMobileNavBar />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <form onSubmit={(event) => this.handleFormSubmission(event)}>
          <input
            className={styles.input}
            name="email"
            placeholder="Email"
            type="email"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
          ></input>
          {this.state.width < 800 && (
            <React.Fragment>
              <input
                className={styles.nameInput}
                name="first-name"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(event) =>
                  this.setState({ firstName: event.target.value })
                }
              ></input>
              <input
                className={styles.nameInput}
                name="last-name"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(event) =>
                  this.setState({ lastName: event.target.value })
                }
              ></input>
            </React.Fragment>
          )}
          {this.state.width > 800 && (
            <div className={styles.nameDiv}>
              <input
                className={styles.nameInput}
                name="first-name"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(event) =>
                  this.setState({ firstName: event.target.value })
                }
              ></input>
              <input
                className={styles.nameInput}
                name="last-name"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(event) =>
                  this.setState({ lastName: event.target.value })
                }
              ></input>
            </div>
          )}

          <input
            className={styles.input}
            name="subject"
            placeholder="Subject"
            value={this.state.subject}
            onChange={(event) => this.setState({ subject: event.target.value })}
          ></input>
          <textarea
            name="message"
            placeholder="Message"
            value={this.state.message}
            onChange={(event) => this.setState({ message: event.target.value })}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Contact;
