import React from 'react';
import clsx from 'clsx';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import image from '../utils/images/logo1.png';

const RigthToLeftAnimations = keyframes`
  0%{
    opacity:1;
 transform : translateX(40px)
  }
100% {
    opacity: 1
    transform : translateX(0px)
  }
`;

const BottomToptAnimations = keyframes`
  0%{
    opacity:1;
 transform : translateY(40px)
  }
100% {
    opacity: 1
    transform : translateY(0px)
  }
`;
const LeftToRightAnimations = keyframes`
0%{
  opacity:1;
transform : translateX(-40px)
}
100% {
  opacity: 1
  transform : translateX(0px)
}
`;
const ContenText = styled.div`
  opacity: 0px;
  position: relative;
  /* width: 100vw; */

  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${BottomToptAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
  @media (max-width: 320px) {
    animation: ${(props) =>
      props.ScrollNumber <= 8
        ? css`
            ${LeftToRightAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
          `
        : ''};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${RigthToLeftAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
  /* @media (max-width: 320px) {
    animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${LeftToRightAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
  } */
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr ',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: '40px',
    marginBottom: '40px',
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      // gridTemplateColumns: '130px 180px ',
      gridTemplateColumns: '109px 180px ',
      height: 'auto',
      gap: '0px',
    },
    // [theme.breakpoints.between('990', '1170')]: {
    //   display: 'flex',
    //   height: 'auto',
    // },
  },

  imageHero: {
    width: '100%',
    maxWidth: '455px',
    height: 'auto',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '227px',
      marginTop: '72px',
    },
  },

  textContainer: {
    lineHeight: '27.2px',
    alignSelf: 'center',
    color: '#454754',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
    },
  },
  h4: {
    fontSize: '61px',
    fontWeight: 'bold',
    color: '#333',
    [theme.breakpoints.down('xs')]: {
      fontSize: '32px',
      textAlign: 'left',
    },
  },

  h1: {
    fontSize: '18px',
    letterSpacing: '8px',
    color: '#333',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

  paperContainer: {
    backgroundImage: `/images/logo1.png`,
  },
  containerText: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    color: '#fff',
    border: 'none',
    padding: '10px 40px',
    backgroundColor: '#cb436b',
    '&:hover': {
      backgroundColor: '#cb436b',
      color: '#fff',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0px 6px',
    },
  },
  left: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  center: {
    display: 'flex',
    alignSelf: 'center',
    marginBottom: '30px',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-start',
    },
  },
}));

function Hero(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.center}>
        <ContenText {...props}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Typography variant='h1' className={classes.h1}>
              #NEW SUMMER COLLECTION 2021
            </Typography>
            <Typography variant='h4' className={classes.h4}>
              NEW ARRIVALS
            </Typography>

            <div className={classes.left}>
              <Button
                variant='outlined'
                className={clsx(classes.margin, classes.button)}
                component={RouterLink}
                to='/shop'
              >
                SHOW NOW
              </Button>
            </div>
          </div>
        </ContenText>
      </div>

      <ImageContainer {...props}>
        <img
          src={image}
          alt='hero_image'
          width='640'
          height='360'
          className={classes.imageHero}
        />
      </ImageContainer>
    </div>
  );
}
export default Hero;
