import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducer/index";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (x) => x;

const enhancer = compose(applyMiddleware(ReduxThunk), devTools);

const store = createStore(reducer, enhancer);

export default store;
