import * as actions from './actionTypes';

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
    const userRef = await firestore.collection('todos').doc(userId);
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

export const deleteTodo = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: actions.DELETE_TODO_START });
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  try {
    const res = await firestore.collection('todos').doc(userId).get();

    const prevTodos = res.data().todos;
    const newTodos = prevTodos.filter((todo) => todo.id !== id);
    await firestore.collection('todos').doc(userId).update({
      todos: newTodos,
    });

    dispatch({ type: actions.DELETE_TODO_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};

export const edditTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log(id, data);
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });
  try {
    console.log(userId);
    const res = await firestore.collection('todos').doc(userId).get();

    const prevTodos = res.data().todos;

    const index = prevTodos.findIndex((todo) => todo.id === id);
    prevTodos[index].todo = data.todo;

    await firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos: [...prevTodos],
      });

    dispatch({ type: actions.ADD_TODO_SUCCESS });
    setTimeout(() => {
      dispatch({ type: actions.ADD_CLEAR_ERROR });
    }, 2000);
    return true;
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};
