import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import SecondaryButton from '../Components/Button/SecondaryButton';
import { useTranslation } from 'react-i18next';
import useRequest from '../Hooks/useRequest';

const ApiErrorPopup = () => {
  const [open, setOpen] = useState(false);

  const { errorHeader, errorBody } = useRequest();
  const { t } = useTranslation();

  useEffect(() => {
    if (errorBody) {
      setOpen(!!errorBody);
    }
  }, [errorBody]);

  const handleClose = () => {
    setOpen(!open);
  };

  let title = '';
  let body = '';

  if (typeof errorBody === 'string') {
    body = errorBody;
  } else if (typeof errorBody === 'object') {
    if (errorBody?.isAxiosError) {
      body = errorBody.response.data.map((err) => err.title).join(', ');
    } else if (errorBody?.title) {
      body = errorBody.title;
    } else if (Array.isArray(errorBody)) {
      body = errorBody.map((err) => err).join(', ');
    }
  }

  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiPaper-root': {
          maxHeight: '70vh'
        }
      }}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{errorHeader}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* {body &&
            body?.map((item, index) => (
              <Typography key={index} variant="body1">
                {t(item)}
              </Typography>
            ))} */}
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose}>{t('errorPopup.button.title')}</SecondaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default ApiErrorPopup;
