import React from 'react';
import styled from 'styled-components';

export default function NewsLetters() {
  return (
    <Container>
      <Title>Our newsletter</Title>
      <Form>
        <Input placeholder='' value='' />
      </Form>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.h1``;
const Form = styled.form``;
const Input = styled.input``;
