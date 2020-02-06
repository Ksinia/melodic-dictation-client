import React, { Component } from "react";
import MelodyList from "./MelodyList";
import { loadMelodies } from "../actions/melody";
import { connect } from "react-redux";
import { url as baseUrl } from "../url";
import MidiPlayer from "web-midi-player";
import ABCJS from "abcjs";

class MelodyListContainer extends Component {
  midiPlayer = new MidiPlayer();
  midiBuffer = ABCJS.synth.supportsAudio() && new ABCJS.synth.CreateSynth();

  static playSynth = async (abcNotation, melodyId, midiBuffer) => {
    if (ABCJS.synth.supportsAudio()) {
      const visualObj = await ABCJS.renderAbc("abc" + melodyId, abcNotation)[0];

      await midiBuffer.stop();
      await midiBuffer.init({
        visualObj: visualObj,
        soundFontUrl: "https://gleitz.github.io/midi-js-soundfonts/MusyngKite/"
      });
      // midiBuffer.prime actually builds the output buffer.
      await midiBuffer.prime();
      // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
      await midiBuffer.start();
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
        playSynth={MelodyListContainer.playSynth}
        midiBuffer={this.midiBuffer}
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
