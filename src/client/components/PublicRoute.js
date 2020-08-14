import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        token != "" ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
