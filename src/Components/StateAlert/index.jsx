import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import TertiaryButton from '../Button/TertiaryButton';

const StateAlert = ({
  open,
  autoHideDuration,
  handleClose,
  icon,
  severity,
  alertTitle,
  alertText,
  buttonText
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}>
      <Alert
        severity={severity}
        sx={{ width: '100%' }}
        action={
          <TertiaryButton color="inherit" size="small" onClick={handleClose}>
            {buttonText}
          </TertiaryButton>
        }
        icon={icon}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default StateAlert;
