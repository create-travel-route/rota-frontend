import React, { useState, useEffect } from 'react';
import { Stack, Box, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { Category } from '../../Constants/Category';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Input from '../Input';
import MainButton from '../Button/MainButton';
import PlaceIcon from '@mui/icons-material/Place';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { createPropertySchema } from '../../Schemas';

const center = { lat: 40.77264639690838, lng: 30.392697210479174 };

const CreateProperty = ({ isUpdate }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(center); // Konum state'i
  const [address, setAddress] = useState('');
  const [data, setData] = useState(null);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      budget: '',
      address: '',
      lat: '',
      lng: ''
    },
    validationSchema: createPropertySchema,
    onSubmit: async (values, bag) => {
      console.log({ ...values, address, ...location });
    }
  });

  const handleMapClick = ({ lat, lng }) => {
    setLocation({ lat, lng });
    getAddressFromCoordinates(lat, lng);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`
      );
      const data = response.data;
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        setAddress(address);
      } else {
        console.error('Geocode API error:', data.error_message || data.status);
      }
    } catch (error) {
      console.error('Geocode API request failed:', error);
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://662e684ea7dda1fa378cddf4.mockapi.io/api/property/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="111vh"
      width="100vw"
      position="relative">
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
        <Stack direction="column" style={{ width: '550px' }} spacing={2}>
          <Input
            label={t('input.title')}
            onChange={formik.handleChange('title')}
            value={isUpdate && data ? data.title : formik.values.title}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            required
          />

          <Input
            label={t('input.description')}
            value={isUpdate && data ? data.description : formik.values.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">{t('input.category')}</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label={t('input.category')}
              value={isUpdate && data ? data.category : formik.values.category}
              onChange={formik.handleChange('category')}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              required>
              {Object.values(Category).map((category, index) => (
                <MenuItem key={index} value={category}>
                  {t(`category.${category}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" alignItems="center">
            <Input
              label={t('input.address')}
              value={isUpdate && data ? data.address : address}
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              required
              fullWidth
            />
          </Stack>
          <Box position="relative" style={{ width: '100%', height: '300px', border: '24px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
              defaultCenter={center}
              defaultZoom={13}
              onClick={handleMapClick}>
              <PlaceIcon lat={location.lat} lng={location.lng} style={{ color: 'red' }} />
            </GoogleMapReact>
          </Box>
          <Input
            label={t('input.budget')}
            type="number"
            value={isUpdate && data ? data.budget : formik.values.budget}
            onChange={formik.handleChange('budget')}
            onBlur={formik.handleBlur}
            error={formik.touched.budget && Boolean(formik.errors.budget)}
            inputProps={{ min: 1 }}
            required
          />
          <MainButton type="submit">
            {isUpdate ? t('button.updateProperty') : t('button.createProperty')}
          </MainButton>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateProperty;
