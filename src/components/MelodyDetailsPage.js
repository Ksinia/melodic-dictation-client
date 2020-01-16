import React from "react";
import ReactAbcjs from "react-abcjs";
import MusicInputFormContainer from "./MusicInputFormContainer";
import "./MelodyDetailsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function MelodyDetailsPage(props) {
  let replacedText = "";
  if (props.melody) {
    replacedText = props.melody.abcStart.replace(/Q:.*\nI:.*\n/, "");
  }
  return (
    <div>
      {props.melody ? (
        <div>
          <h3>{props.melody.name}</h3>
          <div className="top-buttons">
            <div className="top-button" onClick={props.play}>
              <FontAwesomeIcon icon={faPlayCircle} size="2x" />
            </div>
            {props.user && (
              <button className="top-button ugly-button" onClick={props.start}>
                Create new answer
              </button>
            )}
          </div>
          {props.user ? (
            <div>
              {(props.phase === "started" || props.phase === "finished") && (
                <MusicInputFormContainer
                  phase={props.phase}
                  changePhase={props.changePhase}
                />
              )}
              {props.phase === "finished" &&
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
                        replacedText +
                        // props.melody.abcStart +
                        "\n" +
                        props.melody.abcNotes.join(" ") +
                        "|]"
                      }
                      parserParams={{}}
                      engraverParams={{ responsive: "resize", staffwidth: 650 }}
                      renderParams={{ viewportHorizontal: true }}
                    />
                  </div>
                )}
              {props.stats && (
                <div className="stats">
                  {props.stats.all ? (
                    <div>
                      {props.stats.all == 1 ? (
                        <p>You tried this melody {props.stats.all} time</p>
                      ) : (
                        <p>You tried this melody {props.stats.all} times</p>
                      )}

                      {props.stats.finished ? (
                        <div>
                          {props.stats.finished == 1 ? (
                            <p>Completed {props.stats.finished} time</p>
                          ) : (
                            <p>Completed {props.stats.finished} times</p>
                          )}

                          {props.stats.successful ? (
                            props.stats.successful == 1 ? (
                              <p>{props.stats.successful} time got 100%</p>
                            ) : (
                              <p>{props.stats.successful} times got 100%</p>
                            )
                          ) : (
                            <p>Didn't get 100% yet</p>
                          )}
                        </div>
                      ) : (
                        <p>Never completed</p>
                      )}
                    </div>
                  ) : (
                    <p>
                      You didn't try this melody yet, it's good time to give it
                      a try!
                    </p>
                  )}
                </div>
              )}
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
