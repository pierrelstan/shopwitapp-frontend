import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import services from '../utils/images/services.jpg';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  iconColor: {
    color: '#fff',
    fontSize: 100,
    [theme.breakpoints.down('xs')]: {
      fontSize: 80,
    },
  },
  TitleColor: {
    color: '#454754',
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px',
    },
  },
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
  containerTitle: {
    marginTop: '70px',
    borderLeft: 'solid 5px #D13C6F',
    color: '#454754',
    padding: '20px',
    marginBottom: '70px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '20px',
    },
  },

  containerServices: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: '#fff',
    marginTop: '80px',
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
    textAlign: 'center',
    backgroundImage: ` linear-gradient(80deg, rgba(0, 0, 0, 0.87), #0000009e),url(${services})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: ' center center',
    height: '50vh',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      height: '100%',
      margin: '30px',
      backgroundImage: ` linear-gradient(80deg, rgba(0, 0, 0, 0.87), #0000009e),url(${services})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'initial',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      height: '100%',
      margin: '30px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'initial',
    },
  },
  iconMargin: {
    margin: '20px',
  },
  centeredServices: {
    alignSelf: 'center',
  },
  servicesTitle: {
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      color: '#fff',
    },
  },
  servicesParagraph: {
    fontSize: '16px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  spaceBetweenIcons: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const IconsServices = () => {
  const classes = useStyles();
  const Data = React.useMemo(() => data, []);

  return (
    <React.Fragment>
      {Data &&
        Data.map((Item) => {
          return (
            <div key={Item.id}>
              <IconButton className={classes.iconMargin}>
                {<Item.icon className={classes.iconColor} />}
              </IconButton>
              <Typography variant='h6' className={classes.servicesTitle}>
                {Item.secure}
              </Typography>
              <Typography variant='body1' className={classes.servicesParagraph}>
                {Item.garanty}
              </Typography>
            </div>
          );
        })}
    </React.Fragment>
  );
};

function Services() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div>
        <div className={classes.containerServices}>
          <IconsServices />
        </div>
      </div>
    </div>
  );
}
export default Services;
const data = [
  {
    id: 0,
    icon: EmojiTransportationIcon,
    secure: 'FREE SHIPPING',
    garanty: 'For all order over 99$',
  },
  {
    id: 1,
    icon: WatchLaterIcon,
    secure: 'DELIVERY ON TIME',
    garanty: 'We make sure you got your item on time',
  },
  {
    id: 2,
    icon: AttachMoneyIcon,
    secure: ' SECURE PAYMENT',
    garanty: '   100% secure payment',
  },
];
