import React from "react";
import ReactAbcjs from "react-abcjs";
import ABCJS from "abcjs";
import MusicInputFormContainer from "./MusicInputFormContainer";

function MelodyDetailsPage(props) {
  let abc =
    props.melody &&
    props.melody.abcStart + "\n" + props.melody.abcNotes.join(" ") + "|]";
  return (
    <div>
      <h1>Melody details page</h1>
      {props.melody ? (
        <div>
          <p>{props.melody.name}</p>
          <button onClick={props.play}>Play</button>
          <ReactAbcjs
            key={1}
            abcNotation={abc}
            parserParams={{}}
            engraverParams={{ responsive: "resize" }}
            renderParams={{ viewportHorizontal: true }}
          />
          <hr></hr>
          <button onClick={props.start}>Create new answer</button>
          {(props.phase == "started" || props.phase == "finished") && (
            <MusicInputFormContainer
              phase={props.phase}
              changePhase={props.changePhase}
            />
          )}
          <p>Your previous dictations with this melody:</p>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default MelodyDetailsPage;
