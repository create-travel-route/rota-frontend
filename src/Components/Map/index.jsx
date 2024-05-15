import React, { useEffect, useState } from 'react';
import { Box, Link, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import MainButton from '../Button/MainButton';
import { useTranslation } from 'react-i18next';
import Input from '../Input';

import {
  APIProvider,
  Map as MapComp,
  ControlPosition,
  MapControl,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import PlacesAutocomplete from '../PlacesAutocomplete';
import MapHandler from '../MapHandler';

const center = { lat: 40.77264639690838, lng: 30.392697210479174 };

const Map = ({ routes, setRoutes, formik }) => {
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
            style={{ width: '100vw', height: '100%' }}
            defaultCenter={center}
            defaultZoom={13}
            gestureHandling="greedy"
            disableDefaultUI={true}
            fullScreenControl={false}
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
          <MapControl position={ControlPosition.BOTTOM_LEFT}>
            <Directions routes={routes} setRoutes={setRoutes} />
          </MapControl>
          <MapHandler place={selectedPlace} />
        </APIProvider>
      </Box>
    </Box>
  );
};

function Directions({ routes, setRoutes }) {
  const { t } = useTranslation();
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  let leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // rota gelince düzeltilmeli
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: 'İstanbul', //routes[0]?.address,
        destination: 'Sakarya', //routes[routes.length - 1]?.address,
        // waypoints: routes.slice(1, -1).map((route) => ({
        //   location: route.address,
        //   stopover: true
        // })),
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  if (!leg) return null;

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: 'white',
        boxShadow: 2,
        zIndex: 1,
        borderRadius: 1,
        mb: 2
      }}>
      <Typography
        variant="h6"
        sx={{
          color: 'header.main',
          fontWeight: 'bold'
        }}>
        {selected.summary}
      </Typography>
      <Typography variant="subtitle2">
        {leg.start_address.split(',')[0]} - {leg.end_address.split(',')[0]}
      </Typography>
      <Typography variant="subtitle2">
        {t('map.distance')}: {leg.distance?.text}
      </Typography>
      <Typography variant="subtitle2">
        {t('map.duration')}: {leg.duration?.text}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'header.main',
          fontWeight: 'bold',
          mt: 1
        }}>
        {t('map.otherRoutes')}
      </Typography>
      <List dense={true}>
        {routes.map((route, index) => (
          <ListItem key={index} disablePadding href="#">
            <Link
              underline="hover"
              component="button"
              variant="body2"
              onClick={() => setRouteIndex(index)}>
              {route.summary}
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Map;
