import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ModalDetails from './ModalDetails';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalItemDetails({open, handleClose, id }) {
  return (
    <div>
    <Dialog
    open={open}
    TransitionComponent={Transition}
    maxWidth="sm"
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >

  <div onClick={handleClose} color="primary" style={{
    display:'flex',
    justifyContent: 'flex-end',
    padding: '20px'

  }}>
      <CloseIcon color="secondary" style={{ fontSize: 40, cursor:'pointer' }} />
    </div>

   <ModalDetails id={id} />
  </Dialog>
  </div>
  )
}

