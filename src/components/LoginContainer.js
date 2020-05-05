import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import FormContainer from "./FormContainer";

class LoginContainer extends Component {
  render() {
    return (
      <FormContainer
        type="login"
        Display={Login}
        history={this.props.history}
        error={this.props.error}
      />
    );
  }
}

export default connect()(LoginContainer);
