import React, { Component } from "react";
import { loadMelody, clearMelodyDetails } from "../actions/melody";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";
import MelodyDetailsPage from "./MelodyDetailsPage";
import { startDictation } from "../actions/dictation";
import { url as baseUrl } from "../url";

class MelodyDetailsPageContainer extends Component {
  melodyId = this.props.match.params.melodyId;
  midiPlayer = new MidiPlayer();

  state = { phase: "notStarted" };

  changePhase = phase => {
    this.setState({ phase: phase });
  };

  play = async () => {
    await this.midiPlayer.stop();
    await this.midiPlayer.play({ url: baseUrl + this.props.melody.url });
  };

  start = () => {
    this.props.dispatch(startDictation(this.melodyId));
    this.setState({ ...this.state, phase: "started" });
  };

  componentDidMount() {
    this.props.dispatch(clearMelodyDetails());
    this.props.dispatch(loadMelody(this.melodyId));
  }

  render() {
    return (
      <MelodyDetailsPage
        play={this.play}
        melody={this.props.melody}
        start={this.start}
        phase={this.state.phase}
        changePhase={this.changePhase}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody
  };
}

export default connect(mapStateToProps)(MelodyDetailsPageContainer);
