import React from "react";
import axios from "axios";

class Rename extends React.Component {
  state = {
    message: "",
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/api");
      console.log(response);
      this.setState({ message: response });
    } catch {
      console.log("Couldn't reach the server");
    }
  }

  render() {
    const { data } = this.state.message;
    return (
      <div>
        <h1>{data ? data : "Couldn't reach the server"}</h1>
      </div>
    );
  }
}

export default Rename;
