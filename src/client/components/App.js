import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const Main = React.lazy(() => import("./Main"));
const Login = React.lazy(() => import("./Auth/Login"));
const Landing = React.lazy(() => import("./Landing"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Group = React.lazy(() => import("./Group"));
const Dish = React.lazy(() => import("./Dish"));
const PageNotFound = React.lazy(() => import("./Common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUser } from "../actions/user";
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
        <Suspense fallback={<div className="loader"></div>}>
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
        </Suspense>
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
