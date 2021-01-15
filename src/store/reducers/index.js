import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import todoReducer from "./todosReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
