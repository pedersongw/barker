import React from "react";
import Forum from "./Forum";
import { useParams } from "react-router-dom";

const ForumHolder = () => {
  const { page } = useParams();
  const { sort } = useParams();

  return <Forum page={page} sort={sort} />;
};

export default ForumHolder;
