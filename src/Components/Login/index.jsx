import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  Box
} from '@mui/material';
import Input from '../Input';
import MainButton from '../Button/MainButton';
import TertiaryButton from '../Button/TertiaryButton';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { loginSchema } from '../../Schemas';
import Register from '../Register';
import styled from '@emotion/styled';

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  flexGrow: 1
}));

function Login({ handleClose, open }) {
  const { t } = useTranslation();
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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
    </>
  );
}

export default Login;
