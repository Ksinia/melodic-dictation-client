import { DICTATION_FETCHED } from "../actions/dictation";

export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case DICTATION_FETCHED: {
      return action.payload;
    }
    default:
      return state;
  }
}
