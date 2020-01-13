import React, { Component } from "react";
import { connect } from "react-redux";
import ReactAbcjs from "react-abcjs";
import "./MusicInputForm.css";

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
    if (
      this.state.userInput.length > 0 &&
      this.state.userInput[this.state.userInput.length - 1] !== "|"
    ) {
      this.pitchesAndRegex.forEach((element, index, array) => {
        const found = this.state.userInput[
          this.state.userInput.length - 1
        ].match(element[1]);
        if (found && index < this.pitchesAndRegex.length - 1) {
          this.setState({
            ...this.state,
            userInput: [
              ...this.state.userInput.slice(0, -1),
              this.state.userInput[this.state.userInput.length - 1].replace(
                found,
                this.pitchesAndRegex[index + 1][0]
              )
            ]
          });
        }
      });
    }
  };
  decreasePitchOfLastNote = () => {
    if (
      this.state.userInput.length > 0 &&
      this.state.userInput[this.state.userInput.length - 1] !== "|"
    ) {
      this.pitchesAndRegex.forEach((element, index, array) => {
        const found = this.state.userInput[
          this.state.userInput.length - 1
        ].match(element[1]);
        if (found && index > 0) {
          this.setState({
            ...this.state,
            userInput: [
              ...this.state.userInput.slice(0, -1),
              this.state.userInput[this.state.userInput.length - 1].replace(
                found,
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
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      if (lastNote[lastNote.length - 1] !== ">") {
        this.setState({
          ...this.state,
          userInput: [...this.state.userInput.slice(0, -1), lastNote + ">"]
        });
      } else {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            lastNote.replace(">", "")
          ]
        });
      }
    }
  };

  addSign = event => {
    const lastNote = this.state.userInput[this.state.userInput.length - 1];
    const pressedSign = event.target.getAttribute("name");
    if (this.state.userInput.length > 0 && lastNote !== "|") {
      const existingSign = this.signs.find(sign => {
        return lastNote.includes(sign[0]);
      });
      if (existingSign && existingSign[0] !== pressedSign) {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            lastNote.replace(existingSign[0], pressedSign)
          ]
        });
      } else if (existingSign && existingSign[0] === pressedSign) {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            lastNote.replace(existingSign[0], "")
          ]
        });
      } else {
        this.setState({
          ...this.state,
          userInput: [
            ...this.state.userInput.slice(0, -1),
            pressedSign + lastNote
          ]
        });
      }
    }
  };

  addNote = event => {
    let newState = { ...this.state };
    if (newState.userInput.length > 0) {
      newState.userInput[newState.userInput.length - 1] = newState.userInput[
        newState.userInput.length - 1
      ].replace("!mark!", "");
    }
    // if (event.target.getAttribute("name") !== "|") {
    //   newState.userInput.push("!mark!" + event.target.getAttribute("name"));
    // } else {
    newState.userInput.push(event.target.getAttribute("name"));
    // }
    this.setState(newState);
  };

  onSubmit = event => {
    event.preventDefault();
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

  componentDidMount() {
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
        <div className="input">
          <div
            className="notes"
            style={{ fontFamily: "Bravura", fontSize: 40 }}
          >
            {this.state.notes.map(note => {
              return (
                <div key={note[1]} name={note[0]} onClick={this.addNote}>
                  {note[1]}
                </div>
              );
            })}
          </div>
          <div
            className="otherSymbols"
            style={{ fontFamily: "Bravura", fontSize: 40 }}
          >
            <div onClick={this.increasePitchOfLastNote}>⬆</div>
            <div onClick={this.decreasePitchOfLastNote}>⬇</div>
            {this.signs.map(sign => {
              return (
                <div key={sign[0]} name={sign[0]} onClick={this.addSign}>
                  {sign[1]}
                </div>
              );
            })}
            <div onClick={this.addDot}>.</div>
            <div name="|" onClick={this.addNote}>
              |
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
              ←
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    melody: state.melody
  };
}
export default connect(mapStateToProps)(MusicInputFormContainer);
