import React, { Component } from "react";
import MidiPlayer from "web-midi-player";
import ABCJS from "abcjs";

class AbcjsPlayTest extends Component {
  midiPlayer = new MidiPlayer();
  midiBuffer = new ABCJS.synth.CreateSynth();

  notes = `X:1
T:Paint it black
C:Rolling Stones
Z:Thrimlion
Q:1/4=100
M:4/4
L:1/8
K:C
z f g _a | _b _a g2 | f e f g | _d/2 e/2 f f/4 e/4 _d/2 e9/4 |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z f/2 f/2 _E _E | _A _A/2 _B3/2 _B | c c/2 c/2 c _B/2 c5/2 |
z F G _A | _B _A G F | F E F G| F/2 E3/2 z |`;

  playAbcjsSynth = async (abcNotation, midiBuffer) => {
    const visualObj = await ABCJS.renderAbc("abcjs", abcNotation)[0];
    await midiBuffer.init({
      visualObj: visualObj,
      soundFontUrl: "https://gleitz.github.io/midi-js-soundfonts/MusyngKite/"
    });
    await midiBuffer.prime();
    await midiBuffer.start();
  };

  playWebMidiPlayer = async (abcNotation, midiPlayer) => {
    const midi = await ABCJS.synth.getMidiFile(abcNotation, {
      midiOutputType: "binary"
    });
    await midiPlayer.stop();
    midiPlayer.play({ arrayBuffer: midi[0] });
  };

  render() {
    return (
      <div>
        <br />
        <p>
          <a href="https://github.com/Ksinia/melodic-dictation-client/blob/master/src/components/AbcjsPlayTest.js">
            Source code
          </a>
        </p>
        <p>Version of abcjs: 6.0.0-beta.2</p>
        <p>Version of web-midi-player: 1.3.0</p>
        <button
          onClick={() => {
            this.playWebMidiPlayer(this.notes, this.midiPlayer);
          }}
        >
          Play web midi player
        </button>
        <button
          onClick={() => {
            this.playAbcjsSynth(this.notes, this.midiBuffer);
          }}
        >
          Render and play ABCJS synth
        </button>
        <button
          onClick={() => {
            this.midiPlayer.stop();
            this.midiBuffer.stop();
          }}
        >
          Stop
        </button>
        <div id="abcjs"></div>
      </div>
    );
  }
}

export default AbcjsPlayTest;
