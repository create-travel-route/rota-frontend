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
        <Stack direction="row" spacing={2}>
          <Input
            label={t('input.departurePoint')}
            value={formik.values.departurePoint}
            onChange={formik.handleChange('departurePoint')}
            onBlur={formik.handleBlur('departurePoint')}
            error={formik.touched.arrivalPoint && Boolean(formik.errors.departurePoint)}
            required
          />
          <Input
            label={t('input.arrivalPoint')}
            value={formik.values.arrivalPoint}
            onChange={formik.handleChange('arrivalPoint')}
            onBlur={formik.handleBlur('arrivalPoint')}
            error={formik.touched.arrivalPoint && Boolean(formik.errors.arrivalPoint)}
            required
          />
          <Input
            label={t('input.budget')}
            value={formik.values.budget}
            onChange={formik.handleChange('budget')}
            onBlur={formik.handleBlur('budget')}
            error={formik.touched.budget && Boolean(formik.errors.budget)}
          />
          <MainButton onClick={formik.handleSubmit}>{t('button.createRoute')}</MainButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Map;
