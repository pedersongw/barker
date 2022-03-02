import React, { Component } from "react";
import jwtDecode from "jwt-decode";

class Admin extends React.Component {
  state = {
    user: null,
    isAdmin: false,
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    this.setState({ user: user });
    if (user.isAdmin) {
      this.setState({ isAdmin: true });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.isAdmin.toString()}</h1>
        <button onClick={() => console.log(this.state.user.isAdmin)}>
          console log state user
        </button>
      </div>
    );
  }
}

export default Admin;
