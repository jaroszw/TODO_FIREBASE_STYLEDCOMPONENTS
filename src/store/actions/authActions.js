import * as actions from "./actionTypes";

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
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    };

    const user = firebase.auth().currentUser;
    await user
      .sendEmailVerification(actionCodeSettings)
      .then((data) => {})
      .catch((err) => {
        console.log(err.message);
      });

    await firestore.collection("users").doc(res.user.uid).set({
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
  console.log("After Auth_Starts");

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
  const actionCodeSettings = {
    url: "http://localhost:3000/",
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
//Send recovery password

export const recoverPassword = ({ email }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const auth = firebase.auth();
  dispatch({ type: actions.RECOVERY_START });

  const actionCodeSettings = {
    url: "http://localhost:3000/login",
    handleCodeInApp: true,
  };

  try {
    await auth.sendPasswordResetEmail(email, actionCodeSettings);
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
  }
};

export const editProfile = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: actions.PROFILE_EDIT_START });

  try {
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }

    await firestore.collection("users").doc(userId).set({
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};

export const deleteProfile = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const userId = getState().firebase.auth.uid;
  console.log(userId);
  dispatch({ type: actions.PROFILE_DELETE_START });

  try {
    await firestore.collection("users").doc(userId).delete();
    await user.delete();
  } catch (err) {
    dispatch({ type: actions.PROFILE_DELETE_FAIL, payload: err.message });
    console.log(err);
  }
};


