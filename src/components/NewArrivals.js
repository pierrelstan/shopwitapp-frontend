import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled, { keyframes, css } from 'styled-components';
import { connect } from 'react-redux';
import image from '../utils/images/logo2.png';

// Create the keyframes for the images
const rightAnimations = keyframes`
  0%{
    opacity:1;
 transform : translateX(-40px)
  }
100% {
    opacity: 1
    transform : translateX(0px)
  }
`;

// Create the keyframes forl buttons and the  content text
const leftAnimations = keyframes`
  0%{
    opacity:1;
 transform : translateX(40px)
  }
100% {
    opacity: 1
    transform : translateX(0px)
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Right = styled.div`
  opacity: 0px;
  position: 'absolute';
  animation: ${(props) =>
    props.values === 0
      ? css`
          ${rightAnimations} 3s 0.1s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : props.ScrollNumber >= 4287
      ? css`
          ${rightAnimations} 3s 0.1s  forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : props.ScrollNumber <= 4286
      ? css`
          ${leftAnimations} 3s 0.1s forwards cubic-bezier(0.1, 0.8, 0.2, 1)
        `
      : ''};
  text-align: center;
`;

const Left = styled.div`
  opacity: 0px;
  position: 'absolute';
  animation: ${(props) =>
    props.values === 0
      ? css`
          ${leftAnimations} 3s 0.1s  forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : props.ScrollNumber >= 4287
      ? css`
          ${leftAnimations} 3s 0.1s  forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : // : props.ScrollNumber <= 4286
        // ? css`
        //     ${rightAnimations} 3s 0.1s forwards cubic-bezier(0.1, 0.8, 0.2, 1)
        //   `
        ''};
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee',
    textAlign: 'center',
    padding: '30px',
    // height: '50vh',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      height: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-around',
      height: '50vh',
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      height: 'auto',
    },
  },
  image: {
    width: '100%',
    maxWidth: '555px',
    height: 'auto',
    objectFit: 'cover',

    [theme.breakpoints.between('1088', '1133')]: {
      height: 'auto',
      width: '500px',
    },
    [theme.breakpoints.between('963', '1089')]: {
      height: 'auto',
      width: '400px',
    },
    [theme.breakpoints.between('870', '960')]: {
      width: '500px',
      height: 'auto',
    },
    [theme.breakpoints.between('600', '870')]: {
      width: '400px',
      height: 'auto',
    },
    [theme.breakpoints.between('412', '600')]: {
      width: '300px',
      height: 'auto',
    },
    [theme.breakpoints.down('412')]: {
      width: '100%',
      height: 'auto',
    },
    [theme.breakpoints.down('321')]: {
      width: '100%',
      height: 'auto',
    },
  },
  h4: {
    fontSize: '61px',
    fontWeight: 'bold',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  h1: {
    fontSize: '18px',
    letterSpacing: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  button: {
    backgroundColor: '#cb436b',
    color: '#fff',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#cb436b',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '#30px',
    },
  },
}));
function NewArrivals(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div>
      {!matchesXS && (
        <div className={classes.container}>
          <Right {...props}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Typography variant='h1' className={classes.h1}>
                #NEW SUMMER COLLECTION 2021
              </Typography>
              <Typography variant='h4' className={classes.h4}>
                ARRIVALS SALES
              </Typography>

              <Button
                size={`${!matches ? 'large' : 'small'}`}
                variant='contained'
                className={classes.button}
                component={RouterLink}
                color='inherit'
                to='/shop'
              >
                SHOP NOW
              </Button>
            </div>
          </Right>
          <Left {...props}>
            <img
              src={image}
              alt='Hero'
              width='640'
              height='360'
              className={classes.image}
            />
          </Left>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  values: state.scrollValues.values,
});

export default connect(mapStateToProps)(NewArrivals);
