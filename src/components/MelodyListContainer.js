import React, { Component } from "react";
import MelodyList from "./MelodyList";
import { loadMelodies } from "../actions/melody";
import { connect } from "react-redux";

class MelodyListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadMelodies());
  }
  render() {
    return <MelodyList melodies={this.props.melodies} />;
  }
}

function mapStateToProps(state) {
  return {
    melodies: state.melodies
  };
}

export default connect(mapStateToProps)(MelodyListContainer);
