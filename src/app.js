import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/authentication/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
