import React, { Component } from "react";
import { connect } from "react-redux";
import ReactAbcjs from "react-abcjs";
import "./MusicInputForm.css";
import MidiPlayer from "web-midi-player";
import { loadStats, submitAnswer } from "../actions/dictation";
import play from "./functions/play";

const pitchesAndRegex = [
  ["F,", /F,/],
  ["G,", /G,/],
  ["A,", /A,/],
  ["B,", /B,/],
  ["C", /C(?!,)(?!')/],
  ["D", /D(?!,)(?!')/],
  ["E", /E(?!,)(?!')/],
  ["F", /F(?!,)(?!')/],
  ["G", /G(?!,)(?!')/],
  ["A", /A(?!,)(?!')/],
  ["B", /B(?!,)(?!')/],
  ["c", /c(?!,)(?!')/],
  ["d", /d(?!,)(?!')/],
  ["e", /e(?!,)(?!')/],
  ["f", /f(?!,)(?!')/],
  ["g", /g(?!,)(?!')/],
  ["a", /a(?!,)(?!')(?!r)/],
  ["b", /b(?!,)(?!')/],
  ["c'", /c'/],
  ["d'", /d'/],
  ["e'", /e'/],
];

const signs = [
  ["^", "\ue262"],
  ["_", "\ue260"],
  ["=", "\ue261"],
];

class MusicInputFormContainer extends Component {
  initialState = {
    original: this.props.melody.abcStart,
    userInput: [],
    notes: [],
  };

  state = this.initialState;

  midiPlayer = new MidiPlayer();

  increasePitchOfLastNote = () => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      const pitchIndex = pitchesAndRegex.findIndex((pitch) =>
        lastNote.match(pitch[1])
      );
      // we are able to increase the pinch
      if (pitchIndex < pitchesAndRegex.length - 1 && -1 < pitchIndex) {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            lastNote.replace(
              pitchesAndRegex[pitchIndex][0],
              pitchesAndRegex[pitchIndex + 1][0]
            ),
          ],
        });
      }
    }
  };
  decreasePitchOfLastNote = () => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      const pitchIndex = pitchesAndRegex.findIndex((pitch) =>
        lastNote.match(pitch[1])
      );
      // we are able to decrease the pinch
      if (pitchIndex > 0) {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            lastNote.replace(
              pitchesAndRegex[pitchIndex][0],
              pitchesAndRegex[pitchIndex - 1][0]
            ),
          ],
        });
      }
    }
  };

  addDot = () => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    let updatedLastNote = "";
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      if (lastNote[lastNote.length - 1] !== ">") {
        updatedLastNote = lastNote + ">";
      } else {
        updatedLastNote = lastNote.replace(">", "");
      }
      this.setState({
        ...this.state,
        userInput: [...this.state.userInput.slice(0, -1), updatedLastNote],
      });
    }
  };

  addSign = (event) => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    let updatedLastNote = "";
    const pressedSign = event.target.getAttribute("name");
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      const existingSign = signs.find((sign) => {
        return lastNote.includes(sign[0]);
      });
      if (existingSign && existingSign[0] !== pressedSign) {
        updatedLastNote = lastNote.replace(existingSign[0], pressedSign);
      } else if (existingSign && existingSign[0] === pressedSign) {
        updatedLastNote = lastNote.replace(existingSign[0], "");
      } else {
        updatedLastNote = pressedSign + lastNote;
      }
      this.setState({
        ...this.state,
        userInput: [...this.state.userInput.slice(0, -1), updatedLastNote],
      });
    }
  };

  addNote = (event) => {
    let newState = { ...this.state };
    newState.userInput.push(event.target.getAttribute("name"));
    this.setState(newState);
  };

  onSubmit = () => {
    this.props
      .dispatch(
        submitAnswer(
          this.props.melody.id,
          this.props.dictation.id,
          this.state.userInput
        )
      )
      .then(() => this.props.changePhase("finished"));
  };

  getMinimumNoteDuration(abcStart) {
    const startOfL = abcStart.search("L:");
    const startOfDivider = abcStart.substring(startOfL).search("1/");
    const startOfNextInfo = abcStart.substring(startOfL).search("\n");
    const minNoteDurationDivider = abcStart
      .substring(startOfL)
      .substring(startOfDivider + 2, startOfNextInfo);
    return parseInt(minNoteDurationDivider.trim());
  }

  minNoteDuration = this.getMinimumNoteDuration(this.props.melody.abcStart);

  componentDidUpdate(prevProps) {
    if (
      this.props.phase !== prevProps.phase &&
      this.props.phase === "started"
    ) {
      this.setState({ ...this.state, userInput: [] });
    }
    if (
      this.props.phase !== prevProps.phase &&
      this.props.phase === "finished"
    ) {
      this.props.dispatch(loadStats(this.props.melody.id));
    }
  }

  componentDidMount() {
    this.setState(this.initialState);
    const minNoteDuration =
      this.props.melody &&
      this.getMinimumNoteDuration(this.props.melody.abcStart);

    //TODO: add logic for 1/16th
    const notes = this.props.melody && [
      ["E" + minNoteDuration / 1, "\ue1d2"],
      ["E" + minNoteDuration / 2, "\ue1d3"],
      ["E" + minNoteDuration / 4, "\ue1d5"],
      // below we do not need to add number, because in abc notation E already means E1
      ["E", "\ue1d7"],
    ];
    this.setState({ ...this.state, notes });
  }
  render() {
    const width = Math.min(700, window.innerWidth - 30);
    let replacedText = "";
    if (this.props.melody) {
      replacedText = this.props.melody.abcStart.replace(/Q:.*\nI:.*\n/, "");
    }
    return (
      <React.Fragment>
        <p className="answerHeader">Your answer:</p>
        <div style={{ width: width + 30, margin: "auto", textAlign: "left" }}>
          <ReactAbcjs
            abcNotation={
              // this.props.melody.abcStart +
              replacedText + "\n" + this.state.userInput.join(" ") + "|]"
            }
            parserParams={{
              wrap: {
                minSpacing: 0.8,
                maxSpacing: 1.8,
                preferredMeasuresPerLine: 4,
              },
            }}
            engraverParams={{
              staffwidth: width,
              scale: 1.3,
              add_classes: true,
            }}
            renderParams={{}}
          />
        </div>
        {(this.props.phase === "started" ||
          this.props.phase === "finished") && (
          <button
            className="ugly-button"
            onClick={() =>
              play(
                this.state.original + "\n" + this.state.userInput.join(" "),
                this.midiPlayer
              )
            }
          >
            Play your answer
          </button>
        )}
        {this.props.phase === "started" && (
          <div>
            <div className="input" style={{ width: width }}>
              <div
                className="notes"
                style={{ fontFamily: "Bravura", fontSize: 40 }}
              >
                {this.state.notes.map((note) => {
                  return (
                    <div key={note[1]} name={note[0]} onClick={this.addNote}>
                      <div className="symbol" name={note[0]}>
                        {note[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="arrows" style={{ fontSize: 50 }}>
                <div onClick={this.increasePitchOfLastNote}>
                  <div className="symbol arrow">⭡</div>
                </div>
                <div onClick={this.decreasePitchOfLastNote}>
                  <div className="symbol arrow">⭣</div>
                </div>
              </div>
              <div
                className="signs"
                style={{ fontFamily: "Bravura", fontSize: 40 }}
              >
                {signs.map((sign) => {
                  return (
                    <div key={sign[0]} name={sign[0]} onClick={this.addSign}>
                      <div className="symbol" name={sign[0]}>
                        {sign[1]}
                      </div>
                    </div>
                  );
                })}
                <div onClick={this.addDot}>
                  <div className="symbol">.</div>
                </div>
              </div>
              <div
                className="rest"
                style={{ fontFamily: "Arial", fontSize: 30 }}
              >
                <div name="|" onClick={this.addNote}>
                  <div className="symbol" name="|">
                    |
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (this.state.userInput.length > 0) {
                      this.setState({
                        ...this.state,
                        userInput: this.state.userInput.slice(0, -1),
                      });
                    }
                  }}
                >
                  <div className="symbol arrow">⭠</div>
                </div>
              </div>
            </div>

            {this.props.user ? (
              <button
                className="ugly-button"
                type="submit"
                onClick={this.onSubmit}
              >
                Submit your answer
              </button>
            ) : (
              <p>Please log in to submit and check your result</p>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody,
    dictation: state.dictation,
    user: state.user,
  };
}
export default connect(mapStateToProps)(MusicInputFormContainer);
