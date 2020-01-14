import React from "react";
import ReactAbcjs from "react-abcjs";
import ABCJS from "abcjs";
import MusicInputFormContainer from "./MusicInputFormContainer";

function MelodyDetailsPage(props) {
  return (
    <div>
      <h1>Melody details page</h1>
      {props.melody ? (
        <div>
          <p>{props.melody.name}</p>
          <button onClick={props.play}>Play</button>

          {props.user ? (
            <div>
              <button onClick={props.start}>Create new answer</button>
              {(props.phase == "started" || props.phase == "finished") && (
                <MusicInputFormContainer
                  phase={props.phase}
                  changePhase={props.changePhase}
                />
              )}
              {props.phase == "finished" &&
                props.dictation &&
                props.dictation.score !== null && (
                  <div className="result">
                    <p className="answerHeader">
                      Your score is {props.dictation.score}%
                    </p>
                    <p className="answerHeader">Original notes:</p>
                    <ReactAbcjs
                      key={1}
                      abcNotation={
                        props.melody.abcStart +
                        "\n" +
                        props.melody.abcNotes.join(" ") +
                        "|]"
                      }
                      parserParams={{}}
                      engraverParams={{ responsive: "resize" }}
                      renderParams={{ viewportHorizontal: true }}
                    />
                  </div>
                )}
              <p>Your previous dictations with this melody:</p>
            </div>
          ) : (
            <p>Please log in to write dictation</p>
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default MelodyDetailsPage;
