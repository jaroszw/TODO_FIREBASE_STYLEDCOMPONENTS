import * as actions from "./actionTypes";

export const addTodo = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log(data);
  dispatch({ type: actions.ADD_TODO_START });
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  try {
    // const userRef = firestore.doc(`todos/${userId}`);
    const userRef = await firestore.collection("todos").doc(userId);
    const snapShot = await userRef.get();

    const newTodo = {
      id: new Date().valueOf(),
      todo: data.todo,
    };

    if (!snapShot.exists) {
      await userRef.set({ todos: [newTodo] });
    } else {
      await userRef.update({
        todos: firestore.FieldValue.arrayUnion(newTodo),
      });
    }

    // await firestore
    //   .collection("todos")
    //   .doc(userId)
    //   .update({
    //     todos: firestore.FieldValue.arrayUnion(newTodo),
    // todos: [...snapShot.data().todos, newTodo],
    //   });

    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};
