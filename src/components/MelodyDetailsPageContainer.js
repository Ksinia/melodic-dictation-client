import React, { Component } from "react";
import { loadMelody, clearMelodyDetails } from "../actions/melody";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";
import MelodyDetailsPage from "./MelodyDetailsPage";
import { startDictation, loadStats } from "../actions/dictation";
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
    if (this.props.user) {
      console.log("load stats");
      this.props.dispatch(loadStats(this.melodyId));
    }
  }

  render() {
    return (
      <div>
        <MelodyDetailsPage
          play={this.play}
          melody={this.props.melody}
          dictation={this.props.dictation}
          start={this.start}
          phase={this.state.phase}
          changePhase={this.changePhase}
          user={this.props.user}
          stats={this.props.stats}
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
    stats: state.stats
  };
}

export default connect(mapStateToProps)(MelodyDetailsPageContainer);
