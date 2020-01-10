import React from "react";

function MelodyDetailsPage(props) {
  return (
    <div>
      <h1>Melody details page</h1>
      {props.melody ? (
        <div>
          <p>{props.melody.name}</p>
          <p>{props.melody.url}</p>
          <button onClick={props.play}>Play</button>
          <hr></hr>
          <button onClick={props.start}>Try</button>
          <p>Your previous dictations with this melody:</p>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default MelodyDetailsPage;
