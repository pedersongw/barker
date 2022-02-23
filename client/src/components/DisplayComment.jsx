import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TopMobileNavBar from "./TopMobileNavBar";
import CommentHolder from "./CommentHolder";

const DisplayComment = () => {
  const { id } = useParams();
  const { parentPost } = useParams();

  return (
    <div className="forum-main-large">
      <TopMobileNavBar />

      <div className="left-placeholder">
        <h1>stuff</h1>
        <h1>stuff</h1>
        <h1>stuff</h1>
        <h1>stuff</h1>
        <h1>stuff</h1>
        <h1>stuff</h1>
        <button onClick={() => console.log(id, parentPost)}>use params</button>
      </div>
      <div className="right-comment-holder">
        <CommentHolder id={id} parentPost={parentPost} />
      </div>
    </div>
  );
};

export default DisplayComment;
