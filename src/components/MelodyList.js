import React from "react";
import { Link } from "react-router-dom";
import "./MelodyList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import play from "./functions/play";

function MelodyList(props) {
  return [
    <h1 key="title">List of melodies</h1>,
    <div key="list" className="melody-list">
      {props.melodies
        ? props.melodies.map((melody) => (
            <div key={melody.id} className="list-element">
              <div className="text">
                <Link to={`/melody/${melody.id}`}>
                  <p>{melody.name}</p>
                </Link>
                <p>Popularity: {melody.dictationsCount}</p>
              </div>
              <div className="abc" id={"abc" + melody.id}></div>
              <div
                className="play-button-in-list"
                onClick={() => {
                  play(
                    melody.abcStart + "\n" + melody.abcNotes.join(" "),
                    props.midiPlayer
                  );
                }}
              >
                <FontAwesomeIcon icon={faPlayCircle} size="2x" />
              </div>
            </div>
          ))
        : "Loading..."}
    </div>,
  ];
}

export default MelodyList;
