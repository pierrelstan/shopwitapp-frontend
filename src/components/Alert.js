import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  sticky: {
    position: 'fixed',
    zIndex: 100,
  },
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.sticky, classes.root)}>
      {alerts !== null && alerts.length > 0 && (
        <div>
          <LinearProgress color='primary' />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(
  React.memo(Alert, (prev, next) => {
    if (prev === next.alerts) {
      return true;
    }
  }),
);
