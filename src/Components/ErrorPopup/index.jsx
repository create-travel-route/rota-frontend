import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import SecondaryButton from '../Button/SecondaryButton';
import { useTranslation } from 'react-i18next';

const ErrorPopup = ({ formik }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const renderNestedErrors = (errors) => {
    if (!errors || typeof errors !== 'object') {
      return [];
    }

    let errorArray = [];

    Object.values(errors).forEach((item) => {
      if (item.props && item.props.i18nKey) {
        errorArray.push(item.props.i18nKey);
      } else {
        Object.values(item).forEach((i) => errorArray.push(...renderNestedErrors({ a: i })));
      }
    });

    return errorArray;
  };

  useEffect(() => {
    if (formik.isSubmitting === true && Object.keys(formik.errors).length > 0) {
      const errorArray = renderNestedErrors(formik.errors);
      setErrors(errorArray);
      setOpen(true);
    }
  }, [formik.isSubmitting, formik.errors]);

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
      <DialogTitle id="alert-dialog-title">{t('errorPopup.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errors.map((item, index) => (
            <Typography key={index}>{t(item)}</Typography>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose}>{t('errorPopup.button.title')}</SecondaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorPopup;
