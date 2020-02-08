import React from "react";
import ReactAbcjs from "react-abcjs";
import MusicInputFormContainer from "./MusicInputFormContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { isSafari, isIOS } from "react-device-detect";
import "./UserPage.css";

function UserPage(props) {
  //   let replacedText = "";
  //   if (props.melody) {
  //     replacedText = props.melody.abcStart.replace(/Q:.*\nI:.*\n/, "");
  //   }
  props.user && console.log(props.user.melodies);
  return (
    <div>
      <h1 key="title">My melodies</h1>
      <div key="list" className="my-list">
        {props.user
          ? props.user.melodies.length > 0
            ? props.user.melodies.map(melody => (
                <div key={melody.id} className="my-melody-list-element">
                  <div className="text">
                    {/* <Link to={`/melody/${melody.id}`}> */}
                    <p>{melody.name}</p>
                    {/* </Link> */}

                    <p>Popularity: {melody.dictationsCount}</p>
                  </div>
                  <div
                    className="play-button-in-list"
                    onClick={
                      isIOS || isSafari
                        ? () =>
                            props.playSynth(
                              melody.abcStart +
                                "\n" +
                                melody.abcNotes.join(" "),
                              melody.id,
                              props.midiBuffer
                            )
                        : () => props.play(melody.url)
                    }
                  >
                    <FontAwesomeIcon icon={faPlayCircle} size="2x" />
                  </div>
                  <p>Notes:</p>
                  <ReactAbcjs
                    key={melody.id}
                    abcNotation={
                      //   replacedText +
                      melody.abcStart + "\n" + melody.abcNotes.join(" ") + "|]"
                    }
                    parserParams={{
                      wrap: {
                        minSpacing: 0.8,
                        maxSpacing: 1.8,
                        preferredMeasuresPerLine: 4
                      }
                    }}
                    engraverParams={{
                      staffwidth: Math.min(800, window.innerWidth - 30),
                      scale: 1.3
                    }}
                    renderParams={{}}
                  />
                  <div className="abc" id={"abc" + melody.id}></div>
                </div>
              ))
            : "You didn't create melodies yet"
          : "Loading..."}
      </div>
    </div>
  );
}

export default UserPage;
