import firebase from "../Firebase/Firebase";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import logger from "redux-logger";

import rootReducer from "./reducers/index";

import config from "../Firebase/Firebase";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      logger,
      thunk.withExtraArgument({ getFirestore, getFirebase })
    ),
    reduxFirestore(firebase, config)
  )
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
