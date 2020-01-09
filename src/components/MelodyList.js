import React from "react";
import { Link } from "react-router-dom";

function MelodyList(props) {
  return (
    <div>
      <h1>List of melodies</h1>
      {props.melodies
        ? props.melodies.map(melody => (
            <Link key={melody.id} to={`/melody/${melody.id}`}>
              <p>{melody.name}</p>
            </Link>
          ))
        : "Loading..."}
    </div>
  );
}

export default MelodyList;
