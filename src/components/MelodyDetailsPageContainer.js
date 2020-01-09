import React, { Component } from "react";
import { loadMelody, clearMelodyDetails } from "../actions/melody";
import { connect } from "react-redux";
// import * as fs from "fs-web";
var fs = require("browserify-fs");
// import MidiPlayer from "midi-player-js";
// import { JZZ } from "jzz-midi-smf";
const { Midi } = require("@tonejs/midi");
var JZZ = require("jzz");
require("jzz-midi-smf")(JZZ);

class MelodyDetailsPageContainer extends Component {
  melodyId = this.props.match.params.melodyId;
  play = () => {
    var midiout = JZZ().openMidiOut();
    var smf = new JZZ.MIDI.SMF(this.props.melody.content);
    var player = smf.player();
    player.connect(midiout);
    player.play();
  };

  componentDidMount() {
    this.props.dispatch(clearMelodyDetails());
    this.props.dispatch(loadMelody(this.melodyId));
  }

  render() {
    return (
      <div>
        <h1>Melody details page</h1>
        {this.props.melody ? (
          <div>
            <p>{this.props.melody.name}</p>
            <p>{this.props.melody.url}</p>
            <button onClick={this.play}>Play</button>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody
  };
}

export default connect(mapStateToProps)(MelodyDetailsPageContainer);
