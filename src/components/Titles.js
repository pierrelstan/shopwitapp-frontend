import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  iconColor: {
    color: '#454754',
    fontSize: 100,
  },
  TitleBorderBottomColor: {
    borderBottom: 'solid 5px #D13C6F',
  },
  TitleColor: {
    color: '#454754',
    marginBottom: '30px',
    paddingBottom: '7px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px',
    },
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerTitle: {
    display: 'flex',
    marginTop: '70px',
    color: '#454754',
    marginBottom: '20px',
    [theme.breakpoints.down('800')]: {
      justifyContent: 'center',
    },
  },

  container: {},
  centered: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  titleBorderLeftColor: {
    borderLeft: 'solid 5px #D13C6F',
    paddingLeft: '20px',
    [theme.breakpoints.down(800)]: {
      paddingLeft: '12px',
      fontSize: '34px',
      borderBottom: ' 5px solid #D13C6F',
      borderLeft: 'none',
      width: '334px',
    },
  },
  MostRatedCentered: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Titles(props) {
  const classes = useStyles();
  return (
    <Box className={classes.containerTitle}>
      <Typography
        variant='h3'
        className={clsx(classes.TitleColor, classes.titleBorderLeftColor)}
      >
        {props.children}
      </Typography>
    </Box>
  );
}
