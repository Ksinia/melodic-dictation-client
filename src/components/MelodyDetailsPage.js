import React, { useMemo } from "react";
import ReactAbcjs from "react-abcjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import MusicInputFormContainer from "./MusicInputFormContainer";
import "./MelodyDetailsPage.css";
import play from "./functions/play";

function MelodyDetailsPage({
  melody,
  user,
  start,
  midiPlayer,
  phase,
  changePhase,
  dictation,
  stats,
}) {
  const replacedText = useMemo(
    () => (melody ? melody.abcStart.replace(/Q:.*\nI:.*\n/, "") : ""),
    [melody]
  );
  if (!melody) {
    return "Loading...";
  }
  return (
    <React.Fragment>
      <div className="abc" id={"abc" + melody.id}></div>
      <h3>{melody.name}</h3>
      <div className="top-buttons">
        <div
          className="top-button"
          onClick={() =>
            play(melody.abcStart + "\n" + melody.abcNotes.join(" "), midiPlayer)
          }
        >
          <FontAwesomeIcon icon={faPlayCircle} size="2x" />
        </div>
        {user && (
          <button className="top-button ugly-button" onClick={start}>
            Create new answer
          </button>
        )}
      </div>
      {user ? (
        <div>
          {(phase === "started" || phase === "finished") && (
            <MusicInputFormContainer phase={phase} changePhase={changePhase} />
          )}
          {phase === "finished" && dictation && dictation.score !== null && (
            <div className="result">
              <p className="answerHeader">Your score is {dictation.score}%</p>
              <p className="answerHeader">Original notes:</p>
              <ReactAbcjs
                key={1}
                abcNotation={
                  replacedText +
                  // melody.abcStart +
                  "\n" +
                  melody.abcNotes.join(" ") +
                  "|]"
                }
                parserParams={{
                  wrap: {
                    minSpacing: 0.8,
                    maxSpacing: 1.8,
                    preferredMeasuresPerLine: 4,
                  },
                }}
                engraverParams={{
                  staffwidth: Math.min(800, window.innerWidth - 30),
                  scale: 1.3,
                }}
                renderParams={{}}
              />
            </div>
          )}
          {stats && (
            <div className="stats">
              {stats.all ? (
                <div>
                  {stats.all === 1 ? (
                    <p>You tried this melody {stats.all} time</p>
                  ) : (
                    <p>You tried this melody {stats.all} times</p>
                  )}

                  {stats.finished ? (
                    <div>
                      {stats.finished === 1 ? (
                        <p>Completed {stats.finished} time</p>
                      ) : (
                        <p>Completed {stats.finished} times</p>
                      )}

                      {stats.successful ? (
                        stats.successful === 1 ? (
                          <p>{stats.successful} time got 100%</p>
                        ) : (
                          <p>{stats.successful} times got 100%</p>
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
                  You didn't try this melody yet, it's good time to give it a
                  try!
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to write dictation</p>
      )}
    </React.Fragment>
  );
}

export default MelodyDetailsPage;
