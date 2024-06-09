import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ErrorPopup, Map } from '../../Components';
import { useFormik } from 'formik';
import { basicFormSchema } from '../../Schemas';
import useRequest from '../../Hooks/useRequest';
import ENDPOINTS from '../../Constants/Endpoints';

function Homepage() {
  const [routes, setRoutes] = useState([]);

  const { axios } = useRequest();

  const formik = useFormik({
    initialValues: {
      departurePoint: null,
      arrivalPoint: null,
      budget: '',
      category: '',
      comment: '',
      point: ''
    },
    validationSchema: basicFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const params = {
        lat1: values.departurePoint?.lat,
        lon1: values.departurePoint?.lng,
        lat2: values.arrivalPoint?.lat,
        lon2: values.arrivalPoint?.lng,
        budget: values.budget,
        category: values.category,
        review: values.comment,
        rating: values.point
      };

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '')
      );

      try {
        const response = await axios.get(ENDPOINTS.route, { params: filteredParams });
        if (response) {
          setRoutes(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Map routes={routes} formik={formik} />
      </Box>
      <ErrorPopup formik={formik} />
    </>
  );
}

export default Homepage;
