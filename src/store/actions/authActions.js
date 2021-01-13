import * as actions from './actionTypes';

//Sign up
export const signUp = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  dispatch({ type: actions.AUTH_START });

  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    const actionCodeSettings = {
      url: 'http://localhost:3000/',
      handleCodeInApp: true,
    };

    const user = firebase.auth().currentUser;
    await user
      .sendEmailVerification(actionCodeSettings)
      .then((data) => {})
      .catch((err) => {
        console.log(err.message);
      });

    await firestore.collection('users').doc(res.user.uid).set({
      firstName: data.firstName,
      lastName: data.lastName,
    });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
    await setTimeout(() => {
      dispatch({ type: actions.ERROR_NULL });
    }, 3000);
  }

  dispatch({ type: actions.AUTH_END });
};

//LogOut action creator
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

//Log in action

export const signIn = (data) => async (dispatch, getState, { getFirebase }) => {
  console.log(data);
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  console.log('After Auth_Starts');

  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

// Clean up messages

export const clean = () => ({
  type: actions.CLEAN_UP,
});

//Verify email acction = to be refactor to separate helper action
export const verifyEmail = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log('action starts');

  const actionCodeSettings = {
    url: 'http://localhost:3000/',
    handleCodeInApp: true,
  };

  const firebase = getFirebase();
  dispatch({ type: actions.VERIFY_START });
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification(actionCodeSettings);
    dispatch({ type: actions.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
  }
};
