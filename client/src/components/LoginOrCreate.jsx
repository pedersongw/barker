import React from "react";
import { useParams } from "react-router-dom";
import Login from "./LoginPage";
import Create from "./CreateUserPage";

const LoginPage = () => {
  const { loginOrCreate } = useParams();

  return (
    <React.Fragment>
      {loginOrCreate === "create" && <Create />}
      {loginOrCreate === "login" && <Login />}
    </React.Fragment>
  );
};

export default LoginPage;
