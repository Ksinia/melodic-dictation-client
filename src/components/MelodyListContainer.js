import React, { Component } from "react";
import MelodyList from "./MelodyList";
import { loadMelodies } from "../actions/melody";
import { connect } from "react-redux";
import { url as baseUrl } from "../url";
import MidiPlayer from "web-midi-player";
import ABCJS from "abcjs";

class MelodyListContainer extends Component {
  midiPlayer = new MidiPlayer();

  playSynth = async (abcNotation, melodyId) => {
    if (ABCJS.synth.supportsAudio()) {
      var visualObj = await ABCJS.renderAbc("abc" + melodyId, abcNotation)[0];
      const midiBuffer = new ABCJS.synth.CreateSynth();
      await midiBuffer
        .init({
          visualObj: visualObj,
          soundFontUrl: "http://gleitz.github.io/midi-js-soundfonts/MusyngKite/"
        })
        .then(function() {
          // midiBuffer.prime actually builds the output buffer.
          return midiBuffer.prime();
        })
        .then(function() {
          // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
          midiBuffer.start();
          return Promise.resolve();
        });
    }
  };

  play = async url => {
    await this.midiPlayer.stop();
    this.midiPlayer.play({ url: baseUrl + url });
  };

  componentDidMount() {
    this.props.dispatch(loadMelodies());
  }
  render() {
    return (
      <MelodyList
        melodies={this.props.melodies}
        play={this.play}
        playSynth={this.playSynth}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    melodies: state.melodies
  };
}

export default connect(mapStateToProps)(MelodyListContainer);
