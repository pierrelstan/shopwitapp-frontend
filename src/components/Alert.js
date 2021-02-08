import React from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

const Alert = ({ alerts }) => {
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
export default connect(mapStateToProps)(
  React.memo(Alert, (prev, next) => {
    console.log(next);
    if (prev === next.alerts) {
      return true;
    }
  }),
);
