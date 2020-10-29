import React from 'react';
import { Container } from '@material-ui/core';

export default function Wrapper(props) {
  return (
    <Container
      maxWidth='lg'
      style={{
        marginTop: '50px',
      }}
    >
      {props.children}
    </Container>
  );
}
