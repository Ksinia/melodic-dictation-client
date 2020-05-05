import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup";
import FormContainer from "./FormContainer";

class SignupContainer extends Component {
  render() {
    return (
      <FormContainer
        type="signup"
        Display={Signup}
        history={this.props.history}
        error={this.props.error}
      />
    );
  }
}

export default connect()(SignupContainer);
