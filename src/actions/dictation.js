import superagent from "superagent";
import { url as baseUrl } from "../url";

export const DICTATION_FETCHED = "DICTATION_FETCHED";

export const startDictation = melodyId => async (dispatch, getState) => {
  const url = `${baseUrl}/melody/${melodyId}/dictation`;
  try {
    const response = await superagent
      .post(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`)
      .send(melodyId);
    console.log("response test:", response);
    const action = {
      type: DICTATION_FETCHED,
      payload: response.body
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};

export const submitAnswer = (melodyId, dictationId, userInput) => async (
  dispatch,
  getState
) => {
  const url = `${baseUrl}/melody/${melodyId}/dictation/${dictationId}`;
  try {
    const userInputObject = { userInput: userInput };
    const response = await superagent
      .put(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`)
      .send(userInputObject);
    console.log("response test:", response);
    const action = {
      type: DICTATION_FETCHED,
      payload: response.body
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};
