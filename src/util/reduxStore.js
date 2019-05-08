import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducers from "../reducers/index.js";

import { register } from "../sagas/authentication.js";

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  createLogger(),
  sagaMiddleware
);

export default initState => {
  const store = createStore(reducers, initState, middleware);

  sagaMiddleware.run(register);

  return store;
};
