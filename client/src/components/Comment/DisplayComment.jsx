import React from "react";
import { useParams } from "react-router-dom";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import CommentHolder from "./CommentHolder";

const DisplayComment = () => {
  const { id } = useParams();
  const { parentPost } = useParams();

  return (
    <div>
      <TopMobileNavBar />

      <div>
        <CommentHolder id={id} parentPost={parentPost} />
      </div>
    </div>
  );
};

export default DisplayComment;
