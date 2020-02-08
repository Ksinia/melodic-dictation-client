import React, { Component } from "react";
import { connect } from "react-redux";
import MidiPlayer from "web-midi-player";
import { url as baseUrl } from "../url";
import ABCJS from "abcjs";
import UserPage from "./UserPage";

class UserPageContainer extends Component {
  midiPlayer = new MidiPlayer();
  midiBuffer = ABCJS.synth.supportsAudio() && new ABCJS.synth.CreateSynth();

  play = async url => {
    await this.midiPlayer.stop();
    this.midiPlayer.play({ url: baseUrl + url });
  };

  componentDidMount() {}

  render() {
    if (!this.props.user) {
      this.props.history.push("/");
    }
    return (
      <div>
        <UserPage
          play={this.play}
          user={this.props.user}
          midiBuffer={this.midiBuffer}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody,
    user: state.user
  };
}

export default connect(mapStateToProps)(UserPageContainer);
