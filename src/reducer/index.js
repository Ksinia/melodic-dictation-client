import { combineReducers } from "redux";
import user from "./auth";
import error from "./error";
import melodies from "./melodies";
import melody from "./melody";
import dictation from "./dictation";
import stats from "./stats";

export default combineReducers({
  user,
  error,
  melodies,
  melody,
  dictation,
  stats,
});
