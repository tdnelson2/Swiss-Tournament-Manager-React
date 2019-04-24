import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  const { children, open, handleClose, title } = props;

  const renderSecondaryButton = () => {
    if (props.hasOwnProperty('handleSecondary') &&
        props.hasOwnProperty('secondaryText')) {
      return (
        <Button onClick={props.handleSecondary} color="primary">
          {props.secondaryText}
        </Button>
      );
    } else {
      return '';
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent id="alert-dialog-description">
          {children}
      </DialogContent>
      <DialogActions>
        {renderSecondaryButton()}
        <Button onClick={handleClose} color="primary">
          {'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
