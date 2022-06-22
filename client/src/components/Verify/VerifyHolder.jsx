import React from "react";
import Verify from "./Verify";
import { useParams } from "react-router-dom";

const VerifyHolder = () => {
  const { confirmationCode } = useParams();

  return (
    <div>
      <div>
        <Verify code={confirmationCode} />
      </div>
    </div>
  );
};

export default VerifyHolder;
