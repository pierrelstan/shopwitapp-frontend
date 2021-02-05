import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
const Padding = styled.div`
  padding: 10px;
  /* margin: 10px; */
  @-moz-document url-prefix(320px) {
    padding: 30px;
  }
`;
const NewsLetters = React.memo(function NewsLettersMail(props) {
  /* render using props */

  const [valueSubscribe, setValueSubscribe] = useState({
    email: '',
    error: false,
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(valueSubscribe);
    setValueSubscribe({ ...valueSubscribe, [name]: value });
  };

  const handleSubscribe_Submit = (e) => {
    e.preventDefault();

    if (valueSubscribe.email === '') {
      const message_Failed = 'Please enter a valid email';
      enqueueSnackbar(message_Failed, {
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      setValueSubscribe({
        email: '',
        error: true,
      });
    } else {
      const message_Success = 'Thank you for Subscribing';
      enqueueSnackbar(message_Success, {
        preventDuplicate: true,
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      setValueSubscribe({
        email: '',
      });
    }
  };
  return (
    <Container>
      <Padding>
        <Title>Our newsletter</Title>
        <div>
          <Paragraph>
            Promotion new products and sales Directly to your email
          </Paragraph>

          <Form onSubmit={handleSubscribe_Submit}>
            <Input
              name='email'
              placeholder='example@gmail.com'
              value={valueSubscribe.email}
              onChange={handleChange}
              type='email'
              pattern='[^ @]*@[^ @]*'
            />
            <Button type='submit'>Subscribe</Button>
          </Form>
          <p
            style={{
              fontSize: '12px',
            }}
          >
            By subscribing, you agree to receive emails from us. Don't worry, we
            are not spamers.
          </p>
        </div>
      </Padding>
    </Container>
  );
});

export default NewsLetters;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  height: 50vh;
  @media (max-width: 320px) {
    height: 100vh;
    background-color: #eee;
  }
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.167;
  text-transform: uppercase;
  color: #454754;
  margin-bottom: 12px;
  @media (max-width: 320px) {
    font-size: 40px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: nowrap;
  /* width: 80%; */
`;
const Input = styled.input`
  width: 80%;
  padding: 12px 20px;
  border: none;
  z-index: 1;
`;
const Paragraph = styled.p`
  color: #333;
  margin-bottom: 30px;
`;
const Button = styled.button`
  padding: 4px 50px;
  background-color: #cb436b;
  color: #ffffff;
  border: 1px solid #cb436b;
  position: relative;
  z-index: 2;
  @media (max-width: 320px) {
    padding: 4px 20px;
  }
`;
