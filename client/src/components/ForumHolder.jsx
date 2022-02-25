import React from "react";
import Forum from "./Forum";
import { useParams } from "react-router-dom";

const ForumHolder = () => {
  const { page } = useParams();

  return <Forum page={page} />;
};

export default ForumHolder;
