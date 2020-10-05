import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedLogin({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        auth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default ProtectedLogin;
