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
import useAuth from '../../Hooks/useAuth';
import { register } from '../../Utils/Auth';
import StateAlert from '../StateAlert';
import { Check } from '@mui/icons-material';

const Register = ({ handleClose, open }) => {
  const { t } = useTranslation();
  const { setIsLoginOpen } = useAuth();

  const [apiErrors, setApiErrors] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

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
      try {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          passwordAgain: values.passwordAgain,
          isHost: values.isHost
        }).then((res) => {
          if (res) {
            bag.resetForm();
            setSuccessModal(true);
            setIsLoginOpen(true);
            handleClose();
          }
        });
      } catch (error) {
        if (typeof error === 'string') {
          setApiErrors(error);
        } else if (typeof error === 'object') {
          if (error.name === 'AxiosError') {
            setApiErrors(error.response.data);
          } else if (error.message) {
            setApiErrors(error.message);
          } else if (Array.isArray(error)) {
            setApiErrors(error.map((err) => err.message).join(', '));
          }
        }
      }
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
              {apiErrors && (
                <Grid item xs={12}>
                  <Alert severity="error">{apiErrors}</Alert>
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
      <StateAlert
        open={successModal}
        autoHideDuration={3000}
        handleClose={() => setSuccessModal(false)}
        severity="success"
        alertTitle={t('stateAlert.title.success')}
        alertText={t('stateAlert.text.registerSuccess')}
        buttonText={t('common.close')}
        icon={<Check fontSize="inherit" />}
      />
      <ErrorPopup formik={formik} />
    </>
  );
};

export default Register;
