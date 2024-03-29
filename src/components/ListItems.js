import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import imageLogo from '../utils/images/imageLogo.jpg';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
  },
  container: {
    width: 'auto',
    margin: 0,
    [theme.breakpoints.between('1200', '1368')]: {
      width: '1080px',
      margin: '0 auto',
    },
  },
  containerItems: {
    display: 'grid',
    gridTemplateColumns: '320px 320px 320px 320px',
    justifyItems: 'center',
    gap: '42px',
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      gridTemplateColumns: '320px',
    },
    [theme.breakpoints.between('1200', '1368')]: {
      gridTemplateColumns: '320px 320px 320px',
    },
  },
  textLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#333',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  imageCard: {
    maxWidth: '100%',
    objectFit: 'cover',
    position: 'relative',
    top: '-80px !important',
    margin: 0,
    padding: 0,
    width: '322px',
    height: '304px',
    zIndex: 'auto',
    '&:hover': {
      boxShadow: 'none',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.down('xs')]: {
      objectFit: 'cover',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
      top: '-180px',
    },
    [theme.breakpoints.down('md')]: {
      top: '-80px',
      width: '100%',
    },
  },
  card: {
    maxWidth: '327px',
    height: '337px',
    position: 'relative',
    borderRadius: '24px',
    transition: '0.5s ease-in-out ',
    padding: '10px',
    zIndex: 0,
    [theme.breakpoints.down('xs')]: {
      width: '277px',
      height: '296px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '336px',
      maxWidth: '100%',
    },
    boxShadow:
      ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
    '&:hover': {
      position: 'inherit',
      boxShadow:
        'linear-gradient(to bottom, rgba(0,176,155,1.8), rgba(150,201,61,2))',
      transform: 'translateY(20px)',
    },
    '&:hover:before': {
      opacity: 1,
    },
    '&:hover $price': {
      background: '#fff',
      color: '#d13c6f',
    },
    '& p': {
      position: 'absolute',
      top: '100px',
      zIndex: 3,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
      fontSize: '18px',
      wordWrap: 'break-all',
      display: 'none',
      padding: '4px',
      textAlign: 'center',
      backgroundColor: '#555',
    },
    '&:hover p': {
      display: 'block',
      opacity: 1,
      transform: 'translateY(0px)',
    },

    '& h4': {
      textTransform: 'uppercase',
      position: 'absolute',
      top: '20px',
      zIndex: 3,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(-30px)',
      transition: '0.5s all',
      marginLeft: '20px',
    },
    '&:hover h4': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    '& $button': {
      zIndex: 4,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
    },

    '&:hover $button': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
  },
  button: {
    color: '#fff !important',
    objectFit: 'filled',
    margin: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: '1s cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  removeHover: {
    backgroundColor: 'none',
    '&:focus': {
      boxShadow: 'none',
      backgroundColor: 'none',
    },
  },
  price: {
    color: '#ffffff',
    borderRadius: '50%',
    backgroundColor: '#d13c6f',
    width: '60px',
    height: '60px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    zIndex: 2,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerButton: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '227px',
    width: '100%',
  },
}));

export default function ListItems({
  id,
  price,
  title,
  image,
  handleClickOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box onClick={() => handleClickOpen(id)} className={classes.textLink}>
        <Card className={classes.card} elevation={matches ? 1 : 0} key={id}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '20px',
            }}
          >
            <Typography component="span" className={classes.price}>
              ${price}
            </Typography>
          </div>

          {image && (
            <img
              alt={title}
              src={image}
              title={title}
              className={classes.imageCard}
            />
          )}
          {!image && (
            <img
              alt={title}
              src={imageLogo}
              title={title}
              className={classes.imageCard}
            />
          )}
        </Card>
      </Box>
    </Grid>
  );
}
