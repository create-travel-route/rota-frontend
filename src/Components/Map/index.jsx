import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import MainButton from '../Button/MainButton';
import { useTranslation } from 'react-i18next';
import Input from '../Input';

import {
  APIProvider,
  Map as MapComp,
  ControlPosition,
  MapControl
} from '@vis.gl/react-google-maps';
import PlacesAutocomplete from '../PlacesAutocomplete';
import MapHandler from '../MapHandler';

const center = { lat: 40.77264639690838, lng: 30.392697210479174 };

const Map = ({ coordinates, setCoordinates, setBounds, formik }) => {
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="91vh"
      width="100vw"
      position="relative">
      <Box position="absolute" left={0} top={0} height="100%" width="100%">
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
          <MapComp
            style={{ width: '100vw', height: '100vh' }}
            defaultCenter={center}
            defaultZoom={13}
            gestureHandling="greedy"
            disableDefaultUI={true}
          />

          <MapControl position={ControlPosition.TOP_CENTER}>
            <Box p={3} borderRadius={1} m={4} bgcolor="white" boxShadow={2} zIndex={1}>
              <form onSubmit={formik.handleSubmit} noValidate>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <PlacesAutocomplete
                    name="departurePoint"
                    label={t('input.departurePoint')}
                    value={formik.values.departurePoint}
                    onBlur={formik.handleBlur}
                    error={formik.touched.departurePoint && Boolean(formik.errors.departurePoint)}
                    required={true}
                    formik={formik}
                    onPlaceSelect={setSelectedPlace}
                  />

                  <PlacesAutocomplete
                    name="arrivalPoint"
                    label={t('input.arrivalPoint')}
                    value={formik.values.arrivalPoint}
                    onBlur={formik.handleBlur}
                    error={formik.touched.arrivalPoint && Boolean(formik.errors.arrivalPoint)}
                    required={true}
                    formik={formik}
                    onPlaceSelect={setSelectedPlace}
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
          </MapControl>
          <MapHandler place={selectedPlace} />
        </APIProvider>
      </Box>
    </Box>
  );
};

export default Map;
