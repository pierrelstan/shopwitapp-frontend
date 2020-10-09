import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoutes({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) {
  console.log(loading, isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
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

export default connect(mapStateToProps)(ProtectedRoutes);
