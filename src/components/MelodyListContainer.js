import React, { Component } from "react";
import MelodyList from "./MelodyList";
import { loadMelodies } from "../actions/melody";
import { connect } from "react-redux";
import { url as baseUrl } from "../url";
import MidiPlayer from "web-midi-player";

class MelodyListContainer extends Component {
  midiPlayer = new MidiPlayer();

  play = async url => {
    await this.midiPlayer.stop();
    await this.midiPlayer.play({ url: baseUrl + url });
  };

  componentDidMount() {
    this.props.dispatch(loadMelodies());
  }
  render() {
    return <MelodyList melodies={this.props.melodies} play={this.play} />;
  }
}

function mapStateToProps(state) {
  return {
    melodies: state.melodies
  };
}

export default connect(mapStateToProps)(MelodyListContainer);
