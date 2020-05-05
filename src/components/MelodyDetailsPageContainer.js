import React, { Component } from "react";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";
import { clearMelodyDetails, loadMelody } from "../actions/melody";
import { loadStats, startDictation } from "../actions/dictation";
import MelodyDetailsPage from "./MelodyDetailsPage";

class MelodyDetailsPageContainer extends Component {
  melodyId = this.props.match.params.melodyId;
  midiPlayer = new MidiPlayer();

  state = { phase: "notStarted" };

  changePhase = (phase) => {
    this.setState({ phase: phase });
  };

  start = () => {
    this.props.dispatch(startDictation(this.melodyId));
    this.setState({ ...this.state, phase: "started" });
  };

  componentDidMount() {
    this.props.dispatch(clearMelodyDetails());
    this.props.dispatch(loadMelody(this.melodyId));
    if (this.props.user) {
      this.props.dispatch(loadStats(this.melodyId));
    }
  }

  render() {
    return (
      <div>
        <MelodyDetailsPage
          melody={this.props.melody}
          dictation={this.props.dictation}
          start={this.start}
          phase={this.state.phase}
          changePhase={this.changePhase}
          user={this.props.user}
          stats={this.props.stats}
          midiPlayer={this.midiPlayer}
        />
        <div id="abc"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody,
    dictation: state.dictation,
    user: state.user,
    stats: state.stats,
  };
}

export default connect(mapStateToProps)(MelodyDetailsPageContainer);
