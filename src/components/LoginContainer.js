import React from "react";
import Login from "./Login";
import FormContainer from "./FormContainer";

function LoginContainer(props) {
  return (
    <FormContainer
      type="login"
      Display={Login}
      history={props.history}
      error={props.error}
    />
  );
}

export default LoginContainer;
