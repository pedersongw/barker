import React from "react";
import { config } from "../../URLs.jsx";
import axios from "axios";

class Verify extends React.Component {
  state = {
    message: null,
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
      console.log(response);
      this.setState({ message: response.data, status: response.status });
      setTimeout(() => (window.location = "/forum/1/all"), 3000);
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Verify;
