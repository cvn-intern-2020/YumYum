import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
        </Switch>
      </>
    );
  }
}