import React, { useEffect, useState } from 'react';
import { Link, List, ListItem, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const Directions = ({ properties, formik }) => {
  const { t } = useTranslation();
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routeIndex, setRouteIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || properties?.length === 0) return;

    const waypoints = properties
      .filter((route) => route.title !== 'Başlangıç' && route.title !== 'Bitiş')
      .map((route) => ({
        location: route.address,
        stopover: true
      }));

    directionsService
      .route({
        origin: formik.values.departurePoint,
        destination: formik.values.arrivalPoint,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    // return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, properties]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

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
        {routes?.map((route, index) => (
          <ListItem key={index} disablePadding>
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
};

export default Directions;
