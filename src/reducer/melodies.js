import { MELODIES_LOADED } from "../actions/melody";

export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case MELODIES_LOADED: {
      return action.payload;
    }
    default:
      return state;
  }
}
