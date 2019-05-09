import * as actionTypes from "../constants/actionTypes.js";

export const register = (email, username, password, callback) => ({
  type: actionTypes.REGISTER_ACCOUNT,
  email,
  username,
  password,
  callback
});

export const login = (email, password, callback) => ({
  type: actionTypes.LOGIN,
  email,
  password,
  callback
});

export const startAuthRequest = () => ({ type: actionTypes.START_AUTH_REQUEST });

export const endAuthRequest = () => ({ type: actionTypes.END_AUTH_REQUEST });

export const receiveToken = (token) => ({ type: actionTypes.RECEIVE_TOKEN, token });
