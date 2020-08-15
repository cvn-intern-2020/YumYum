import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, location, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token != "" || location.state.token != "") {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default withRouter(PrivateRoute);
