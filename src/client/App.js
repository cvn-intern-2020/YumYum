import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              this.props.token == "" ? (
                <Landing {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/main",
                    state: { from: props.locations },
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/main"
            render={(props) =>
              this.props.token == "" ? (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.locations },
                  }}
                />
              ) : (
                <Main {...props} />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              this.props.token == "" ? (
                <Login {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/main",
                    state: { from: props.locations },
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              this.props.token == "" ? (
                <Signup {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/main",
                    state: { from: props.locations },
                  }}
                />
              )
            }
          />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default withRouter(connect(mapStateToProps, null)(App));
