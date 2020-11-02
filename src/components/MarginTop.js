import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 300px;
`;

export default function MarginTop({ children }) {
  return <Container>{children}</Container>;
}
