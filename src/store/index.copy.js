import { compose, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

import firebase from '../Firebase/Firebase';
import { createFirestoreInstance } from 'redux-firestore';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
