import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import { connect } from "react-redux";
import MelodyListContainer from "./components/MelodyListContainer";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import MelodyDetailsPageContainer from "./components/MelodyDetailsPageContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route
            // exact
            path="/melody/:melodyId"
            component={MelodyDetailsPageContainer}
          />
          <Route exact path="/" component={MelodyListContainer} />
        </Switch>
        <Footer />
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
