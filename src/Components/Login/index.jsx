import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  Box,
  Alert
} from '@mui/material';
import Input from '../Input';
import MainButton from '../Button/MainButton';
import TertiaryButton from '../Button/TertiaryButton';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { loginSchema } from '../../Schemas';
import Register from '../Register';
import styled from '@emotion/styled';
import ErrorPopup from '../ErrorPopup';
import { login } from '../../Utils/Auth';
import useAuth from '../../Hooks/useAuth';

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  flexGrow: 1
}));

function Login({ handleClose, open }) {
  const { t } = useTranslation();
  const { loginAccount } = useAuth();

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const loginResponse = await login({
          email: values.email,
          password: values.password
        });
        loginAccount(loginResponse);
        handleClose();
      } catch (error) {
        setApiErrors(error.response.data.errors[0].message);
      }
    }
  });

  const registerOpen = () => {
    setIsSignupOpen(true);
    handleClose();
  };

  return (
    <>
      <Register handleClose={() => setIsSignupOpen(false)} open={isSignupOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography
            sx={{
              color: 'header.main',
              fontWeight: 'bold',
              fontSize: '32px',
              textAlign: 'center'
            }}
            gutterBottom>
            {t('page.login')}
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Stack direction="column" spacing={2}>
              {apiErrors && <Alert severity="error">{apiErrors}</Alert>}
              <Input
                label={t('login.mail')}
                placeholder="info@mail.com"
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                required
              />

              <Input
                label={t('login.password')}
                onChange={formik.handleChange('password')}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                inputProps={{ maxLength: 25 }}
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    name="toggle"
                    onChange={formik.handleChange('rememberMe')}
                  />
                }
                label={[t('login.rememberMe')]}
              />

              <MainButton type="submit">{t('login.buttonText')}</MainButton>
            </Stack>
          </form>
          <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
            <Item>
              <TertiaryButton>{t('login.forgotPassword')}</TertiaryButton>
            </Item>
            <Item>
              {t('login.donthaveAccount')}
              <TertiaryButton onClick={registerOpen}>{t('login.signup')}</TertiaryButton>
            </Item>
          </Stack>
        </DialogContent>
      </Dialog>
      <ErrorPopup formik={formik} />
    </>
  );
}

export default Login;
