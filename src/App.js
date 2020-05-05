import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import GithubCorner from "react-github-corner";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import MelodyListContainer from "./components/MelodyListContainer";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import MelodyDetailsPageContainer from "./components/MelodyDetailsPageContainer";
import AbcjsPlayTest from "./components/AbcjsPlayTest";
import { getProfileFetch } from "./actions/authorization.js";

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(getProfileFetch());
  };

  render() {
    return [
      <div className="App" key="app">
        <GithubCorner href="https://github.com/Ksinia/melodic-dictation-client" />

        <Toolbar />
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route exact path="/abcjs_play_test" component={AbcjsPlayTest} />
          <Route
            exact
            path="/melody/:melodyId"
            component={MelodyDetailsPageContainer}
          />
          <Route path="/melody" component={MelodyListContainer} />
          <Route path="/" component={MelodyListContainer} />
        </Switch>
      </div>,
      <Footer key="footer" />,
    ];
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(App);
