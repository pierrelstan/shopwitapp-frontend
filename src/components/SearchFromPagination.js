import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchItems, clearSearchItems } from '../redux/actions/ItemsActions';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2),
      display: 'none',
    },
  },
  containerSubMenu: {
    display: 'none',
    // margin: theme.spacing(2),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      justifyContent: 'center',
      display: 'flex',
    },
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  containerLogo: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
    },
  },
  logo: {
    fontSize: '12px',
    textTransform: 'upperCase',
    border: '1px solid #333',
    padding: '2px 10px',
    textDecoration: 'none',
    color: '#333',

    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      fontSize: '22px',
      textTransform: 'upperCase',
      border: '1px solid #333',
      padding: '5px 20px',
      textDecoration: 'none',
      color: '#333',
    },
  },
  hideOnMobile: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  hideOnDeskTop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('600px')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
    },
    justifyContent: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  lineSpacing: {
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '2px',
    color: '#575353',
  },
  // mobile
  moveToRigth: {
    flexGrow: '1',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  containerTitle: {
    textDecoration: 'none',
    color: '#333',
  },
  title: {
    fontSize: '22px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: '#333',
    border: '2px solid #333',
    padding: '5px',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      marginRight: '0px',
    },
  },
  hambergeurMargin: {
    marginLeft: '0px',
    textAlign: 'none',

    [theme.breakpoints.down('xs')]: {
      marginLeft: '10px',
      textAlign: 'center',
    },
  },
  menuTextSize: {
    fontSize: '16px',
    // fontWeight: 400,
  },
  linkColor: {
    color: '#a67a4b',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchFromPagination(props) {
  const [Search, setSearch] = React.useState({
    search: '',
  });

  const handleChange = (e) => {
    try {
      if (e.target.value === '') {
        console.log('m rive!!');
        props.searchItems({
          value: null,
        });
      }

      setSearch({
        ...Search,
        [e.target.name]: e.target.value,
      });
    } catch (error) {}
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    props.searchItems(Search);
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmitSearch}>
        <TextField
          id='filled-basic'
          label='Search'
          placeholder='Search…'
          variant='filled'
          value={Search.search}
          name='search'
          onChange={handleChange}
        />
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  search: state.Search.search,
  value: state.Search.value,
});

export default withRouter(
  connect(mapStateToProps, { searchItems })(SearchFromPagination),
);
