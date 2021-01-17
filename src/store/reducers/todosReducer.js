import * as actions from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: false,
  deleteTodos: {
    error: null,
    loading: false,
  },
};

const todoReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case actions.ADD_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.ADD_TODO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.DELETE_TODO_START:
      return {
        ...state,
        deleteTodos: { ...state.deleteTodos, loading: true },
      };
    case actions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        deleteTodos: { ...state.deleteTodos, loading: false, error: false },
      };
    case actions.DELETE_TODO_FAIL:
      return {
        ...state,
        deleteTodos: { ...state.deleteTodos, loading: false, error: payload },
      };
  }
};

export default todoReducer;
