import { DICTATION_CREATED } from "../actions/dictation";

export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case DICTATION_CREATED: {
      return action.payload;
    }
    default:
      return state;
  }
}
