
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Accordion from '@material-ui/core/Accordion';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { fetchOrderByUserId } from '../redux/actions/order';
import { Grid, Box } from '@material-ui/core';
import Titles from '../components/Titles';
import Wrapper from '../components/Wrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 151,
    height: 140,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();

  const { orders, loading } = useSelector((state) => ({
    orders: state.orderPayments.orders,
    loading: state.orderPayments.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchOrderByUserId(id));
  }, [dispatch, id]);
  return (
    <Container component="main" maxWidth="lg">
      <Titles>history of orders</Titles>
      {!loading && (
        <Wrapper>
          <CircularProgress color="secondary" />
        </Wrapper>
      )}
      <div
        style={{
          marginTop: '40px',
        }}
      >
        {orders.map((item) => (
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {moment(item.created).format('MMM Do YY')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className={classes.root}>
                  <Grid container spacing={5}>
                    {item.carts.map((cart) => (
                      <Grid item xs={12} sm={6}>
                        <Card
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div className={classes.details}>
                            <CardContent className={classes.content}>
                              <Typography component="h5" variant="h5">
                                {cart.title}
                              </Typography>
                            </CardContent>
                          </div>

                          <CardMedia
                            className={classes.image}
                            image={cart.imageUrl}
                            title="Live from space album cover"
                          />
                        </Card>
                      </Grid>
                    ))}
                    <Box
                      style={{
                        padding: '10px',
                      }}
                    >
                      <Typography variant="h3">
                        Total: {item.subTotal}$
                      </Typography>
                    </Box>
                  </Grid>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
