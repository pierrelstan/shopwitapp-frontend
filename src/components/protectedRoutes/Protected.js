import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoutes({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Navigate replace to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default ProtectedRoutes
