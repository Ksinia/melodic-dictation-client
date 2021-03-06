import superagent from "superagent";
import { url as baseUrl } from "../url";

export const DICTATION_FETCHED = "DICTATION_FETCHED";

export const startDictation = (melodyId) => async (dispatch, getState) => {
  const url = `${baseUrl}/melody/${melodyId}/dictation`;
  try {
    const response = await superagent
      .post(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`)
      .send(melodyId);
    const action = {
      type: DICTATION_FETCHED,
      payload: response.body,
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
    const response = await superagent
      .put(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`)
      .send({ userInput });
    const action = {
      type: DICTATION_FETCHED,
      payload: response.body,
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};

export const PREVIOUS_DICTATIONS_FETCHED = "PREVIOUS_DICTATIONS_FETCHED";

export const loadDictations = (melodyId) => async (dispatch, getState) => {
  const url = `${baseUrl}/melody/${melodyId}/dictation`;
  try {
    const response = await superagent
      .get(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`);
    const action = {
      type: PREVIOUS_DICTATIONS_FETCHED,
      payload: response.body,
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};
export const STATS_FETCHED = "STATS_FETCHED";

export const loadStats = (melodyId) => async (dispatch, getState) => {
  const url = `${baseUrl}/melody/${melodyId}/stats`;
  try {
    const response = await superagent
      .get(url)
      .set("Authorization", `Bearer ${getState().user.jwt}`);
    const action = {
      type: STATS_FETCHED,
      payload: response.body,
    };
    dispatch(action);
  } catch (error) {
    console.error();
  }
};
