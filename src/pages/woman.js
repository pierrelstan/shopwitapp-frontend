import React from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NewArrivals from '../components/NewArrivals';
import { Container } from '@material-ui/core';
import PaginationControlled from '../components/Pagination';
import ScrollOnTop from '../components/ScrollOnTop';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Woman(props) {
  const classes = useStyles();

  let history = useHistory();

  function handleClick(event) {
    console.info('You clicked a breadcrumb.');
    history.push('/');
  }

  return (
    <div>
      <ScrollOnTop />
      <NewArrivals />
      <Container>
        <Breadcrumbs
          maxItems={2}
          aria-label='breadcrumb'
          style={{
            marginTop: '10px',
          }}
        >
          <Link
            color='textPrimary'
            style={{
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            Home
          </Link>

          <Typography color='inherit' variant='h6'>
            Shop
          </Typography>
        </Breadcrumbs>

        <Typography
          variant='h6'
          style={{
            paddingTop: '50px',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '30px',
          }}
        >
          Shop All
        </Typography>
        <PaginationControlled />
      </Container>
    </div>
  );
}

export default Woman;
