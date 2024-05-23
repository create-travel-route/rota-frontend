import React, { useState, useEffect, useMemo } from 'react';
import { Box, MenuItem, Typography, Grid, Container, Stack } from '@mui/material';
import { Category } from '../../Constants/Category';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createPropertySchema } from '../../Schemas';
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Marker,
  useMarkerRef,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { ErrorPopup, Input, MainButton, MapHandler, PlacesAutocomplete } from '../../Components';
import useRequest from '../../Hooks/useRequest';
import ENDPOINTS from '../../Constants/Endpoints';

const center = { lat: 40.77264639690838, lng: 30.392697210479174 };

const CreatePropertyPage = ({ isUpdate }) => {
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState('');
  const [latLng, setLatLng] = useState(null);
  const [markerRef] = useMarkerRef();

  const { id } = useParams();
  const { createData, updateData, useGetData } = useRequest();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: property } = useGetData('property', `${ENDPOINTS.properties}/${id}`, {
    enabled: !!id
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      budget: '',
      address: null,
      lat: '',
      lng: ''
    },
    validationSchema: createPropertySchema,
    onSubmit: async (values) => {
      if (pathname.includes('create-property')) {
        await createData.mutateAsync(
          {
            endpoint: ENDPOINTS.properties,
            body: {
              ...values,
              address: selectedPlace,
              lat: latLng.lat,
              lng: latLng.lng
            }
          },
          {
            onSuccess: async () => {
              navigate('/properties');
            }
          }
        );
      } else {
        await updateData.mutateAsync(
          {
            endpoint: `${ENDPOINTS.properties}/${id}`,
            body: {
              ...values,
              address: selectedPlace,
              lat: latLng.lat,
              lng: latLng.lng
            }
          },
          {
            onSuccess: async () => {
              navigate('/properties');
            }
          }
        );
      }
    }
  });

  useEffect(() => {
    if (property) {
      formik.setValues({
        title: property.title,
        description: property.description,
        category: property.category,
        budget: property.budget,
        address: {
          lat: property.location.coordinates[1],
          lng: property.location.coordinates[0]
        },
        lat: property.location.coordinates[1],
        lng: property.location.coordinates[0]
      });
      setSelectedPlace(property.address);
      setLatLng({ lat: property.location?.coordinates[1], lng: property.location?.coordinates[0] });
    }
  }, [property]);

  const Geocoding = () => {
    const geocodingLib = useMapsLibrary('geocoding');
    const geocoder = useMemo(() => geocodingLib && new geocodingLib.Geocoder(), [geocodingLib]);

    useEffect(() => {
      if (!geocoder && !latLng) return;

      geocoder?.geocode({ location: latLng }).then((result) => {
        const { results } = result;
        const address = results[0].formatted_address;
        setSelectedPlace(address);
      });
    }, [geocoder]);
  };

  return (
    <Stack mb={3}>
      <Container>
        <Typography
          sx={{
            color: 'header.main',
            fontWeight: 'bold',
            fontSize: '32px',
            textAlign: 'center'
          }}
          gutterBottom>
          {isUpdate ? t('page.updateProperty') : t('page.createProperty')}
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2} justifyContent="flex-end" mb={2}>
            <Grid item xs={12} md={6}>
              <Input
                label={t('input.title')}
                onChange={formik.handleChange('title')}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label={t('input.description')}
                value={formik.values.description}
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                select
                labelId="category-label"
                id="category"
                label={t('input.category')}
                value={formik.values.category}
                onChange={formik.handleChange('category')}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                required>
                {Object.values(Category).map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {t(`category.${category}`)}
                  </MenuItem>
                ))}
              </Input>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label={t('input.budget')}
                type="number"
                value={formik.values.budget}
                onChange={formik.handleChange('budget')}
                onBlur={formik.handleBlur}
                error={formik.touched.budget && Boolean(formik.errors.budget)}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box position="relative" style={{ width: '100%', height: '300px', border: '24px' }}>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
                  <Map
                    defaultCenter={center}
                    defaultZoom={13}
                    gestureHandling="greedy"
                    disableDefaultUI={true}
                    onClick={(e) => {
                      setLatLng(e.detail.latLng);
                      formik.setFieldValue('address', {
                        lat: e.detail.latLng.lat,
                        lng: e.detail.latLng.lng
                      });
                    }}>
                    <Geocoding />
                    {latLng && <Marker ref={markerRef} position={latLng} />}
                    <MapControl position={ControlPosition.TOP_CENTER}>
                      <Box m={2}>
                        <PlacesAutocomplete
                          name="address"
                          label={t('input.address')}
                          onBlur={formik.handleBlur}
                          error={formik.touched.address && Boolean(formik.errors.address)}
                          required={true}
                          formik={formik}
                          onPlaceSelect={setSelectedPlace}
                          selectedPlace={selectedPlace}
                          setLatLng={setLatLng}
                        />
                      </Box>
                    </MapControl>
                  </Map>
                  <MapHandler place={selectedPlace} />
                </APIProvider>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <MainButton type="submit">
                {isUpdate ? t('button.updateProperty') : t('button.createProperty')}
              </MainButton>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ErrorPopup formik={formik} />
    </Stack>
  );
};

export default CreatePropertyPage;
