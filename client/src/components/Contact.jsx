import React from "react";
import TopMobileNavBar from "./TopMobileNavBar";

class Contact extends React.Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <div>
        <h1>Contact</h1>
        <TopMobileNavBar page="contact" />
      </div>
    );
  }
}

export default Contact;
