import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    ToRigth: {
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-end',
      },
    },
    color: '#fff',
  },
  TextField: {
    color: '#fff',
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  multilineColor: {
    color: '#fff',
  },
}));

export default function Subscribe() {
  const [valueSubscribe, setValueSubscribe] = useState({
    email: '',
    error: false,
  });

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    console.log(valueSubscribe);
    setValueSubscribe({ ...valueSubscribe, [e.target.name]: e.target.value });
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
        error: false,
      });
    }
  };
  return (
    <div className={classes.container}>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubscribe_Submit}
      >
        <TextField
          id='component-helper'
          value={valueSubscribe.email}
          name='email'
          onChange={handleChange}
          error={valueSubscribe.error}
          aria-describedby='component-helper-text'
          placeholder='example@gmail.com'
          required
          type='email'
          style={{
            color: '#fff !important',
            backgroundColor: '#eee',
            borderRadius: '2px',
            textAlign: 'center',
          }}
        />
        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            size='small'
            style={{
              backgroundColor: '#CB436B',
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
