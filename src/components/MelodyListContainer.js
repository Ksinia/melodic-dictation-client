import React, { Component } from "react";
import MelodyList from "./MelodyList";
import { loadMelodies } from "../actions/melody";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";
import ABCJS from "abcjs";

class MelodyListContainer extends Component {
  midiPlayer = new MidiPlayer();

  static playAbcjs = async (abcNotation, midiPlayer) => {
    const midi = await ABCJS.synth.getMidiFile(abcNotation, {
      midiOutputType: "binary",
    });
    await midiPlayer.stop();
    midiPlayer.play({ arrayBuffer: midi[0] });
  };

  componentDidMount() {
    this.props.dispatch(loadMelodies());
  }

  render() {
    return (
      <MelodyList melodies={this.props.melodies} midiPlayer={this.midiPlayer} />
    );
  }
}

function mapStateToProps(state) {
  return {
    melodies: state.melodies,
  };
}

export default connect(mapStateToProps)(MelodyListContainer);
