import * as actionTypes from "../constants/actionTypes.js";

export const register = (email, username, password) => ({
  type: actionTypes.REGISTER_ACCOUNT,
  email,
  username,
  password
});

export const login = (email, password) => ({
  type: actionTypes.LOGIN,
  email,
  password
});
