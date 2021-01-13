import * as actions from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actions.AUTH_START:
      return {
        ...state,
        loading: true,
      };

    case actions.AUTH_END:
      return {
        ...state,
        loading: false,
      };

    case actions.AUTH_FAIL:
      return {
        ...state,
        error: payload,
      };

    case actions.ERROR_NULL:
      return {
        ...state,
        error: null,
      };

    case actions.AUTH_SUCCESS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default authReducer;