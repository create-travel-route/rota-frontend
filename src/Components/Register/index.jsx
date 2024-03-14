import React, { useEffect, useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Typography
} from '@mui/material';
import Input from '../Input';
import MainButton from '../Button/MainButton';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { registerSchema } from '../../Schemas';
import ErrorPopup from '../ErrorPopup';

const Register = ({ handleClose, open }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',
      isHost: false
    },
    validationSchema: registerSchema,
    onSubmit: async (values, bag) => {
      console.log(values);
    }
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            sx={{
              color: 'header.main',
              fontWeight: 'bold',
              fontSize: '32px',
              textAlign: 'center'
            }}
            gutterBottom>
            {t('page.signup')}
          </Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogContent>
            <Grid container spacing={2}>
              {formik.errors.general && (
                <Grid item xs={12}>
                  <Alert severity="error">{formik.errors.general}</Alert>
                </Grid>
              )}
              <Grid item xs={6}>
                <Input
                  required
                  label={t('signup.input.firstName')}
                  onChange={formik.handleChange('firstName')}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label={t('signup.input.lastName')}
                  onChange={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  label={t('signup.input.mail')}
                  onChange={formik.handleChange('email')}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label={t('signup.input.password')}
                  onChange={formik.handleChange('password')}
                  value={formik.values.password}
                  type="password"
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  inputProps={{ maxLength: 25 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label={t('signup.input.passwordAgain')}
                  onChange={formik.handleChange('passwordAgain')}
                  value={formik.values.passwordAgain}
                  type="password"
                  error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                  inputProps={{ maxLength: 25 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isHost}
                      name="toggle"
                      onChange={formik.handleChange('isHost')}
                    />
                  }
                  label={[t('signup.input.wantedToHost')]}
                />
              </Grid>
              <Grid item xs={12}>
                <MainButton type="submit">{t('signup.button.title')}</MainButton>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
      <ErrorPopup formik={formik} />
    </>
  );
};

export default Register;
