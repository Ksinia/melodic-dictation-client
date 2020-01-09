import React, { Component } from "react";
import { loadMelody, clearMelodyDetails } from "../actions/melody";
import { connect } from "react-redux";
import { Midi } from "@tonejs/midi";
import Tone from "tone";

/*
var synth = new Tone.PolySynth(8).toMaster()
MidiConvert.load("path/to/midi.mid", function(midi) {
  // make sure you set the tempo before you schedule the events
  Tone.Transport.bpm.value = midi.header.bpm
  // pass in the note events from one of the tracks as the second argument to Tone.Part 
  var midiPart = new Tone.Part(function(time, note) {
    //use the events to play the synth
    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
  }, midi.tracks[0].notes).start()
  // start the transport to hear the events
  Tone.Transport.start()
})
*/

class MelodyDetailsPageContainer extends Component {
  melodyId = this.props.match.params.melodyId;
  play = () => {
    console.log("not breaking");
    const midiFile = new Midi(Buffer.from(this.props.melody.content, "binary"));
    console.log("MIDI: ", midiFile);

    var synth = new Tone.PolySynth(8).toMaster();
    Tone.Transport.bpm.value = midiFile.header.tempos[0].bpm;
    // pass in the note events from one of the tracks as the second argument to Tone.Part
    const myMidi = new Tone.Part(function(time, note) {
      //use the events to play the synth
      synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, midiFile.tracks[0].notes);
    myMidi.start();
    /*
    const player = new Tone.Player(
      Buffer.from(this.props.melody.content, "binary")
    );
    synth.triggerAttack("D3", "+1");
    Tone.start();*/
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
