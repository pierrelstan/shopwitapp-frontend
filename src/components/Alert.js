import React from 'react';

import { connect } from 'react-redux';

import { Paper } from '@material-ui/core';

const Alert = ({ alerts }) => {
  // const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  // React.useEffect(() => {
  //   if (alerts.alertTypes === 'errors') {
  //     const message_Failed = 'Please enter a valid email';
  //     enqueueSnackbar(message_Failed, {
  //       preventDuplicate: true,
  //       autoHideDuration: 3000,
  //       variant: 'warning',
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right',
  //       },
  //     });
  //   } else {
  //     const message_Success = 'Thank you for Subscribing';
  //     enqueueSnackbar(message_Success, {
  //       preventDuplicate: true,
  //       variant: 'success',
  //       autoHideDuration: 3000,
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right',
  //       },
  //     });
  //   }
  // }, []);
  return (
    <Paper>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertTypes} `}>
            {alert.msg}
          </div>
        ))}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
