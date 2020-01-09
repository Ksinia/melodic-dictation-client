import React from "react";

function MelodyList(props) {
  return props.melodies
    ? props.melodies.map(melody => <p>{melody.name}</p>)
    : "Loading...";
}

export default MelodyList;
