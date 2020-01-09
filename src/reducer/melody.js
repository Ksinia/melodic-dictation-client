import { MELODY_LOADED, CLEAR_MELODY } from "../actions/melody";

export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case MELODY_LOADED: {
      return action.payload;
    }
    case CLEAR_MELODY: {
      return null;
    }
    default:
      return state;
  }
}
