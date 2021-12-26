import React from "react";
import Post from "./Post";

class Forum extends React.Component {
  renderDummyPosts = () => {
    let holder = [];
    for (let i = 0; i < 10; i++) {
      holder.push(i);
    }
    return holder.map((index, i) => <Post key={i} />);
  };

  render() {
    return this.renderDummyPosts();
  }
}

export default Forum;
