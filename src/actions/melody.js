import superagent from "superagent";
import { url as baseUrl } from "../url";

export const MELODIES_LOADED = "MELODIES_LOADED";

export const loadMelodies = () => async dispatch => {
  const url = `${baseUrl}/melody`;
  try {
    const response = await superagent.get(url);
    console.log("response test:", response);
    const action = {
      type: MELODIES_LOADED,
      payload: response.body
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};

export const MELODY_LOADED = "MELODY_LOADED";

export const loadMelody = melodyId => async dispatch => {
  const url = `${baseUrl}/melody/${melodyId}`;
  console.log(url);
  try {
    const response = await superagent.get(url);
    // console.log("response test:", response);
    const action = {
      type: MELODY_LOADED,
      payload: response.body
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};

export const CLEAR_MELODY = "CLEAR_MELODY";

export function clearMelodyDetails() {
  return {
    type: CLEAR_MELODY
  };
}
