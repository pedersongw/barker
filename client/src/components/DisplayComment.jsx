import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import TopMobileNavBar from "./TopMobileNavBar";
import CommentHolder from "./CommentHolder";

const DisplayComment = () => {
  const location = useLocation();
  const { comment } = location.state;
  const { id } = useParams();
  const { parentPost } = useParams();

  return (
    <div>
      <TopMobileNavBar />

      <div className="comment-holder">
        <CommentHolder id={id} parentPost={parentPost} />
      </div>
    </div>
  );
};

export default DisplayComment;
