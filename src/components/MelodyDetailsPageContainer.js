import React, { Component } from "react";
import { loadMelody, clearMelodyDetails } from "../actions/melody";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";

class MelodyDetailsPageContainer extends Component {
  melodyId = this.props.match.params.melodyId;
  midiPlayer = new MidiPlayer();

  play = () => {
    this.midiPlayer.stop();
    const buffer = Buffer.from(this.props.melody.content, "binary");
    this.midiPlayer.play({ arrayBuffer: buffer });
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
