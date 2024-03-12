import React, { useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert
} from '@mui/material';
import Input from '../Input';
import MainButton from '../Button/MainButton';
import TertiaryButton from '../Button/TertiaryButton';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { loginSchema } from '../../Schemas';

function Login({ handleClose, open }) {
  const { t } = useTranslation();

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
    onSubmit: async (values, bag) => {
      console.log(values);
    }
  });

  return (
    <>
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
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Input
                placeholder={t('login.mail')}
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                required
              />

              <Input
                placeholder={t('login.password')}
                onChange={formik.handleChange('password')}
                value={formik.values.password}
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
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
                <TertiaryButton>{t('login.forgotPassword')}</TertiaryButton>
                <Stack direction="row">
                  <Typography>{t('login.donthaveAccount')}</Typography>
                  <TertiaryButton>{t('login.signup')}</TertiaryButton>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Login;

/* <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="90vh"
      width="100vw"
      position="relative">
      <Box
        p={3}
        borderRadius={1}
        m={4}
        bgcolor="white"
        mt="10vh"
        width="60vh"
        boxShadow={2}
        zIndex={1}>
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
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Input
              placeholder={t('login.mail')}
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              required
            />

            <Input
              placeholder={t('login.password')}
              onChange={formik.handleChange('password')}
              value={formik.values.password}
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
              <TertiaryButton>{t('login.forgotPassword')}</TertiaryButton>
              <Stack direction="row">
                <Typography>{t('login.donthaveAccount')}</Typography>
                <TertiaryButton>{t('login.signup')}</TertiaryButton>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>*/
