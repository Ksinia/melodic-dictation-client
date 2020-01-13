import React, { Component } from "react";
import { connect } from "react-redux";
import ReactAbcjs from "react-abcjs";

class MusicInputFormContainer extends Component {
  initialState = {
    original: this.props.melody.abcStart,
    userInput: []
  };

  state = this.initialState;

  onSubmit = event => {
    event.preventDefault();
  };

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
        <div className="notes" style={{ fontFamily: "Bravura" }}>
          {["E8", "E4", "E2", "E", "E1/2"].map(note => {
            return (
              <div
                onClick={() => {
                  this.setState({
                    ...this.state,
                    userInput: [...this.state.userInput, note]
                  });
                }}
              >
                {"\ue1d3"}
                note
              </div>
            );
          })}
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
