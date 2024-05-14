import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import Input from '../Input/index';
import CloseIcon from '@mui/icons-material/Close';
import MainButton from '../Button/MainButton';
import { useFormik } from 'formik';
import { rateAndCommentSchema } from '../../Schemas';
import LikeImage from '../../Image/thumbs-up_5223658.png';
const RateAndComment = ({ handleClose, open }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      rate: 0,
      comment: ''
    },
    validationSchema: rateAndCommentSchema,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const handleRateChange = (event, newValue) => {
    formik.setFieldValue('rate', newValue);
  };

  const handleCommentChange = (event) => {
    formik.setFieldValue('comment', event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '400px'
          }
        }
      }}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ textAlign: 'center' }}>
        <img src={LikeImage} style={{ width: ' 80px' }} />
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack direction="column" spacing={3}>
            <Grid item xs={6}>
              <Rating
                name="simple-controlled"
                value={formik.values.rate}
                onChange={handleRateChange}
                style={{ padding: '20px' }}
              />
            </Grid>

            <Grid item xs={6}>
              <Input
                multiline
                label={t('input.comment')}
                rows={4}
                type="text"
                value={formik.values.comment}
                onChange={handleCommentChange}
                inputProps={{ maxLength: 1500 }}
              />
            </Grid>

            <Grid item xs={12}>
              <MainButton type="submit">{t('button.save')}</MainButton>
            </Grid>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RateAndComment;
