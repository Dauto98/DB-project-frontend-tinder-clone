import * as actionTypes from "../constants/actionTypes.js";

const initState = {
  token: "",
  isFetching: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_AUTH_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case actionTypes.END_AUTH_REQUEST: {
      return {
        ...state,
        isFetching: false
      };
    }
    case actionTypes.RECEIVE_TOKEN: {
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token
      };
    }
    default: {
      return state;
    }
  }
};
