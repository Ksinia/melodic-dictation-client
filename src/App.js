import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(App);
