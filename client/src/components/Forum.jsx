import React from "react";
import MobileNavBar from "./MobileNavBar";
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
    return (
      <div>
        {this.renderDummyPosts()}
        <MobileNavBar />
      </div>
    );
  }
}

export default Forum;
