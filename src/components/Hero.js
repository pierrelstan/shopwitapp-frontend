import React from 'react';
import clsx from 'clsx';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

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

const ContenText = styled.div`
  opacity: 0px;
  position: 'absolute';
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${BottomToptAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
`;

const ImageContainer = styled.div`
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${RigthToLeftAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
`;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    gap: '40px',
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.between('990', '1170')]: {
      display: 'flex',
      height: 'auto',
    },
  },

  imageHero: {
    width: '100%',
    maxWidth: '455px',
    height: 'auto',
    objectFit: 'cover',
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
      fontSize: '18px',
    },
  },

  h1: {
    fontSize: '18px',
    letterSpacing: '15px',
    color: '#333',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },

  paperContainer: {
    backgroundImage: `url(https://res.cloudinary.com/stanley/image/upload/v1587764936/header-img_azo9gj.webp)`,
  },
  containerText: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    color: '#fff',
    border: 'none',
    backgroundColor: '#cb436b',
    transition: '1s cubic-bezier(0.2, 0.8,0.2, 1)',
    '&:hover': {
      backgroundColor: '#cb436b',
      color: '#fff',
      transform: 'translateY(-4px)',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '#30px',
    },
  },
}));

export default function Hero(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.container}>
      <ContenText {...props}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant='h1' className={classes.h1}>
            #NEW SUMMER COLLECTION 2020
          </Typography>
          <Typography variant='h4' className={classes.h4}>
            NEW ARRIVALS
          </Typography>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Button
              size={`${matches ? 'small' : 'large'}`}
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
      <ImageContainer {...props}>
        <img
          src='https://res.cloudinary.com/stanley/image/upload/v1604165151/home_t7eo9k.png'
          alt='hero_image'
          className={classes.imageHero}
        />
      </ImageContainer>
    </div>
  );
}
