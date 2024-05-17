import React, { useEffect } from 'react';
import { Box, Grid, Stack, Avatar, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../../Hooks/useAuth';
import useRequest from '../../Hooks/useRequest';
import { useFormik } from 'formik';
import { getMe } from '../../Utils/Auth';
import ENDPOINTS from '../../Constants/Endpoints';
import { updateAccountSchema } from '../../Schemas';
import { ErrorPopup, Input, MainButton } from '../../Components';
import dayjs from 'dayjs';

const Profile = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const { updateData } = useRequest();
  console.log(user);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: ''
    },
    validationSchema: updateAccountSchema,
    onSubmit: async (values) => {
      await updateData.mutate(
        {
          endpoint: `${ENDPOINTS.users}/${user?.id}`,
          body: values
        },
        {
          onSuccess: async () => {
            const { user: me } = await getMe();
            setUser(me);
          }
        }
      );
    }
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Stack gap={3} p={2}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt={user?.firstName.concat(' ', user?.lastName).toUpperCase()}
              src="/static/images/avatar/2.jpg"
            />
            <Stack direction="column" spacing={2}>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="h6"
                color="text.primary">
                {t(`roles.${user?.role}`)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t('profile.createdDate')}
                {dayjs(user?.createdAt).format('DD.MM.YYYY')}
              </Typography>
            </Stack>
          </Stack>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Input
                  required
                  label={t('signup.input.firstName')}
                  onChange={formik.handleChange('firstName')}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Input
                  required
                  label={t('signup.input.lastName')}
                  onChange={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Input
                  disabled
                  label={t('signup.input.mail')}
                  onChange={user?.email}
                  value={user?.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
              </Grid>
              <Grid item md={11} xs={0} />
              <Grid item md={1} xs={12}>
                <MainButton type="submit">{t('button.updateProperty')}</MainButton>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Container>
      <ErrorPopup formik={formik} />
    </Box>
  );
};

export default Profile;
