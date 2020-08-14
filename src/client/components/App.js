import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Group from "./Group";
import Dish from "./Dish";
import { bindActionCreators } from "redux";
import { setUser } from "../actions/user";
import PageNotFound from "./Common/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

class App extends Component {
  componentDidMount() {
    if (this.props.userId == "" && this.props.token != "") {
      this.props.setUser(this.props.token);
    }
  }
  render() {
    return (
      <>
        <Switch>
          <PublicRoute
            component={Landing}
            token={this.props.token}
            path="/"
            exact
          />
          <PrivateRoute
            component={Main}
            token={this.props.token}
            path="/main"
            exact
          />
          <PrivateRoute
            component={Dish}
            token={this.props.token}
            path="/dish"
            exact
          />
          <PublicRoute
            component={Login}
            token={this.props.token}
            path="/login"
            exact
          />
          <PublicRoute
            component={Signup}
            token={this.props.token}
            path="/signup"
            exact
          />
          <Route path="/group">
            <PrivateRoute
              component={Group}
              token={this.props.token}
              path="/group/:groupId"
              exact
            />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user._id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
