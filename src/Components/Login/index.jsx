import React from 'react';
import { Box, Stack, Typography, Checkbox } from '@mui/material'; // Checkbox eklenmiştir
import Input from '../Input';
import MainButton from '../Button/MainButton';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { loginSchema } from '../../Schemas';
function Login() {
  const { t } = useTranslation();

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
    <Box
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
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Typography>{t('login.mail')}</Typography>
            <Input
              label={t('login.input.mail')}
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              required
            />

            <Typography>{t('login.password')}</Typography>
            <Input
              label={t('login.input.password')}
              onChange={formik.handleChange('password')}
              value={formik.values.password}
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              inputProps={{ maxLength: 25 }}
              required
            />

            <Stack direction="row" alignItems="center">
              <Checkbox
                color="inputPlaceholder"
                onChange={formik.handleChange('rememberMe')}
                checked={formik.values.rememberMe}
              />
              <Typography color="inputPlaceholder">{t('login.RememberMe')}</Typography>
            </Stack>

            <MainButton type="submit">{t('login.buttonText')}</MainButton>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
              <Typography>{t('login.ForgotPassword')}</Typography>
              <Stack direction="row">
                <Typography>{t('login.DonthaveAccount')}</Typography>
                <Typography color="primary">{t('login.Signup')}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
