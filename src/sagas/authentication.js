import { put, call, takeEvery } from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes.js";

export function* register() {
  yield takeEvery(actionTypes.REGISTER_ACCOUNT, registerHandler);
}

export function* login() {
  yield takeEvery(actionTypes.LOGIN, loginHandler);
}

function* registerHandler(action) {
  try {
    const res = yield call(fetch, "/api/register", {
      method: "POST",
      body: JSON.stringify({ email: action.email, username: action.username, password: action.password })
    });
    if (res.ok) {
      const data = yield call([res, res.json]);
      console.log(data);
    }
  } catch (e) {
    console.error(e);
  }
}

function* loginHandler(action) {
  try {
    const res = yield call(fetch, "/api/login", {
      method: "POST",
      body: JSON.stringify({ email: action.email, password: action.password })
    });
    if (res.ok) {
      const data = yield call([res, res.json]);
      console.log(data);
    }
  } catch (e) {
    console.error(e);
  }
}
