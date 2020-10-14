import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

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
 transform : translateY(40px)
  }
100% {
    opacity: 1
    transform : translateY(0px)
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const ContenText = styled.div`
  opacity: 0px;
  position: 'absolute';
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${leftAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
  text-align: center;
`;

const ButtonHero = styled(Button)`
  opacity: 0px;
  position: 'absolute';
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${leftAnimations} 4s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const ImageContainer = styled.div`
  animation: ${(props) =>
    props.ScrollNumber <= 8
      ? css`
          ${rightAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
        `
      : ''};
`;

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '600px 590px',
    justifyContent: 'center',
    columnGap: '100px',
    alignItems: 'center',
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      rowGap: '10px',
      height: 'auto',
    },
    [theme.breakpoints.between('990', '1170')]: {
      gridTemplateColumns: '400px 600px',
      columnGap: '25px',
      height: 'auto',
    },
  },

  imageHero: {
    // width: '610px',
    width: '100%',
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

  h5: {
    fontSize: '18px',
    color: '#333',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },

  margin: {
    margin: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  paperContainer: {
    backgroundImage: `url(https://res.cloudinary.com/stanley/image/upload/v1587764936/header-img_azo9gj.webp)`,
  },
  containerText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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

export default function Hero(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.container}>
      <ImageContainer {...props}>
        <img
          src='https://res.cloudinary.com/stanley/image/upload/v1587065025/hero_man_qroemw.webp'
          alt='hero_image'
          className={classes.imageHero}
        />
      </ImageContainer>
      <ContenText {...props}>
        <div clasName={classes.containerText}>
          <Typography variant='h5' className={classes.h5}>
            #NEW SUMMER COLLECTION 2020
          </Typography>
          <Typography variant='h4' className={classes.h4}>
            ARRIVALS SALES
          </Typography>

          <div
            style={{
              marginTop: '4px',
              textAlign: 'center',
            }}
          >
            <Button
              size={`${matches ? 'small' : 'large'}`}
              variant='contained'
              className={clsx(classes.margin, classes.button)}
              component={RouterLink}
              color='inherit'
              to='/shop'
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </ContenText>
    </div>
  );
}
