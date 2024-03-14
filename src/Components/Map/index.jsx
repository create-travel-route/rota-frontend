import React from 'react';
import { Box, Stack } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import MainButton from '../Button/MainButton';
import { useTranslation } from 'react-i18next';
import Input from '../Input';

const center = { lat: 40.77264639690838, lng: 30.392697210479174 };

const Map = ({ coordinates, setCoordinates, setBounds, formik }) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="91vh"
      width="100vw"
      position="relative">
      <Box position="absolute" left={0} top={0} height="100%" width="100%">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={center}
          defaultZoom={13}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
        />
      </Box>
      <Box p={3} borderRadius={1} m={4} bgcolor="white" boxShadow={2} zIndex={1}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack direction="row" spacing={2}>
            <Input
              label={t('input.departurePoint')}
              onChange={formik.handleChange('departurePoint')}
              value={formik.values.departurePoint}
              onBlur={formik.handleBlur}
              error={formik.touched.departurePoint && Boolean(formik.errors.departurePoint)}
              required
            />

            <Input
              label={t('input.arrivalPoint')}
              value={formik.values.arrivalPoint}
              onChange={formik.handleChange('arrivalPoint')}
              onBlur={formik.handleBlur}
              error={formik.touched.arrivalPoint && Boolean(formik.errors.arrivalPoint)}
              required
            />

            <Input
              label={t('input.budget')}
              type="number"
              value={formik.values.budget}
              onChange={formik.handleChange('budget')}
              onBlur={formik.handleBlur}
              error={formik.touched.budget && Boolean(formik.errors.budget)}
              inputProps={{ min: 1 }}
            />

            <MainButton type="submit">{t('button.createRoute')}</MainButton>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Map;
