import React, { Component } from "react";
import { connect } from "react-redux";
import ReactAbcjs from "react-abcjs";
import "./MusicInputForm.css";
import { submitAnswer } from "../actions/dictation";

class MusicInputFormContainer extends Component {
  initialState = {
    original: this.props.melody.abcStart,
    userInput: [],
    notes: []
  };

  state = this.initialState;

  pitchesAndRegex = [
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
    ["e'", /e'/]
  ];

  signs = [
    ["^", "\ue262"],
    ["_", "\ue260"],
    ["=", "\ue261"]
  ];

  increasePitchOfLastNote = () => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];

    if (this.state.userInput.length > 0 && lastNote !== "|") {
      this.pitchesAndRegex.forEach((pitch, index, array) => {
        const notReachHighestLine = index < this.pitchesAndRegex.length - 1;
        const pitchOfLastNote = lastNote.match(pitch[1]);
        if (pitchOfLastNote && notReachHighestLine) {
          this.setState({
            ...this.state,
            userInput: [
              ...this.state.userInput.slice(0, -1),
              lastNote.replace(
                pitchOfLastNote,
                this.pitchesAndRegex[index + 1][0]
              )
            ]
          });
        }
      });
    }
  };
  decreasePitchOfLastNote = () => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      this.pitchesAndRegex.forEach((pitch, index, array) => {
        const notReachLowestLine = index > 0;
        const pitchOfLastNote = lastNote.match(pitch[1]);
        if (pitchOfLastNote && notReachLowestLine) {
          this.setState({
            ...this.state,
            userInput: [
              ...this.state.userInput.slice(0, -1),
              lastNote.replace(
                pitchOfLastNote,
                this.pitchesAndRegex[index - 1][0]
              )
            ]
          });
        }
      });
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
        userInput: [...this.state.userInput.slice(0, -1), updatedLastNote]
      });
    }
  };

  addSign = event => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    let updatedLastNote = "";
    const pressedSign = event.target.getAttribute("name");
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      const existingSign = this.signs.find(sign => {
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
        userInput: [...this.state.userInput.slice(0, -1), updatedLastNote]
      });
    }
  };

  addNote = event => {
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
    console.log("component did update");
    console.log("this.props.phase", this.props.phase);
    console.log("prevProps.phase", prevProps.phase);
    // Typical usage (don't forget to compare props):
    if (
      this.props.phase !== prevProps.phase &&
      this.props.phase === "started"
    ) {
      this.setState({ ...this.state, userInput: [] });
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
      ["E" + minNoteDuration / 8, "\ue1d7"]
    ];
    this.setState({ ...this.state, notes });
  }
  render() {
    return (
      <div>
        <p className="answerHeader">Your answer:</p>
        <ReactAbcjs
          key={1}
          abcNotation={
            this.props.melody.abcStart +
            "\n" +
            this.state.userInput.join(" ") +
            "|]"
          }
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        />
        {this.props.phase === "started" && (
          <div>
            <div className="input">
              <div
                className="notes"
                style={{ fontFamily: "Bravura", fontSize: 40 }}
              >
                {this.state.notes.map(note => {
                  return (
                    <div key={note[1]} name={note[0]} onClick={this.addNote}>
                      <div className="symbol">{note[1]}</div>
                    </div>
                  );
                })}
              </div>
              <div
                className="otherSymbols"
                style={{ fontFamily: "Bravura", fontSize: 40 }}
              >
                <div onClick={this.increasePitchOfLastNote}>
                  <div className="symbol">⬆</div>
                </div>
                <div onClick={this.decreasePitchOfLastNote}>
                  <div className="symbol">⬇</div>
                </div>
                {this.signs.map(sign => {
                  return (
                    <div key={sign[0]} name={sign[0]} onClick={this.addSign}>
                      <div className="symbol">{sign[1]}</div>
                    </div>
                  );
                })}
                <div onClick={this.addDot}>
                  <div className="symbol">.</div>
                </div>
              </div>
              <div name="|" onClick={this.addNote}>
                <div className="symbol">|</div>
              </div>
              <div
                onClick={() => {
                  if (this.state.userInput.length > 0) {
                    this.setState({
                      ...this.state,
                      userInput: this.state.userInput.slice(0, -1)
                    });
                  }
                }}
              >
                <div className="symbol">←</div>
              </div>
            </div>
            <button type="submit" onClick={this.onSubmit}>
              Submit your answer
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody,
    dictation: state.dictation
  };
}
export default connect(mapStateToProps)(MusicInputFormContainer);
