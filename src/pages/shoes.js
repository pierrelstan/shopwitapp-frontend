import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ScrollOnTop from '../components/ScrollOnTop';

export default function Shoes() {
  return (
    <div>
      <ScrollOnTop />
      <h1>Shoes</h1>
    </div>
  );
}
