import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";
import Login from "./Auth/Login";

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route exact path="/main" render={(props) => <Main {...props} />} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
        </Switch>
      </>
    );
  }
}