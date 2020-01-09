import { combineReducers } from "redux";
import user from "./auth";
import error from "./error";
import melodies from "./melodies";
import melody from "./melody";

export default combineReducers({
  user,
  error,
  melodies,
  melody
});
