import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '../Button/SecondaryButton';

const QuestionPopup = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useImperativeHandle(
    ref,
    () => ({
      openDialog: () => {
        setOpen(true);
      },
      closeDialog: () => {
        setOpen(false);
      }
    }),
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{
        zIndex: 10000
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{t('questionPopup.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('questionPopup.description')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={props.yesClick} color="success">
          {t('questionPopup.button.yes')}
        </SecondaryButton>
        <SecondaryButton onClick={handleClose} color="error" autoFocus>
          {t('questionPopup.button.no')}
        </SecondaryButton>
      </DialogActions>
    </Dialog>
  );
});

export default QuestionPopup;
