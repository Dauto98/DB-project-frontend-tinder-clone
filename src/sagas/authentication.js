import { put, call, takeEvery } from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes.js";

import { receiveToken, startAuthRequest, endAuthRequest } from "../actions/authenActions.js";

export function* register() {
  yield takeEvery(actionTypes.REGISTER_ACCOUNT, registerHandler);
}

export function* login() {
  yield takeEvery(actionTypes.LOGIN, loginHandler);
}

function* registerHandler(action) {
  try {
    yield put(startAuthRequest());
    const res = yield call(fetch, "/api/register", {
      method: "POST",
      body: JSON.stringify({ email: action.email, username: action.username, password: action.password })
    });
    if (res.ok) {
      const data = yield call([res, res.json]);
      yield put(receiveToken(data.token));
      action.callback();
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(endAuthRequest());
  }
}

function* loginHandler(action) {
  try {
    yield put(startAuthRequest());
    const res = yield call(fetch, "/api/login", {
      method: "POST",
      body: JSON.stringify({ email: action.email, password: action.password })
    });
    if (res.ok) {
      const data = yield call([res, res.json]);
      yield put(receiveToken(data.token));
      action.callback();
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(endAuthRequest());
  }
}
