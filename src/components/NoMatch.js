/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useLocation } from 'react-router-dom';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h1>Page Not Found {location.pathname}!</h1>
    </div>
  );
}
export default NoMatch;
