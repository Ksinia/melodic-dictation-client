import React from "react";
import { Link } from "react-router-dom";
import "./MelodyList.css";

function MelodyList(props) {
  return [
    <h1 key="title">List of melodies</h1>,
    <div key="list" className="melody-list">
      {props.melodies
        ? props.melodies.map(melody => (
            <div key={melody.id} className="list-element">
              <div className="text">
                <Link to={`/melody/${melody.id}`}>
                  <p>{melody.name}</p>
                </Link>
                <p>Popularity: {melody.dictationsCount}</p>
              </div>
              <button
                className="play-button-in-list"
                onClick={() => props.play(melody.url)}
              >
                Play
              </button>
            </div>
          ))
        : "Loading..."}
    </div>
  ];
}

export default MelodyList;
