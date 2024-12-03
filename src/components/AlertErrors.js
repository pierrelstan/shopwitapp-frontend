import React from 'react';
import { useSnackbar } from 'notistack';

const AlertErrors = ({ alerts }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div
      style={{
        display: 'none',
      }}
    >
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id}>
            {enqueueSnackbar(`${alert.msg}`, {
              variant: `${alert.alertTypes}`,
              preventDuplicate: true,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            })}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default AlertErrors;