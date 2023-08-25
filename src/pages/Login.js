import React from "react";
import Template from "../components/Template";

const Login = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Login to your account"
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default Login;
