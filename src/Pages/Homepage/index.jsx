import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ErrorPopup, Map } from '../../Components';
import { useFormik } from 'formik';
import { basicFormSchema } from '../../Schemas';
import useRequest from '../../Hooks/useRequest';
import ENDPOINTS from '../../Constants/Endpoints';

function Homepage() {
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const { axios } = useRequest();

  const formik = useFormik({
    initialValues: {
      departurePoint: null,
      arrivalPoint: null,
      budget: ''
    },
    validationSchema: basicFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await axios
        .get(
          `${ENDPOINTS.route}?lat1=${values.departurePoint?.lat}&lon1=${values.departurePoint?.lng}&lat2=${values.arrivalPoint?.lat}&lon2=${values.arrivalPoint?.lng}&budget=${values.budget}`
        )
        .then((response) => {
          if (response) {
            setSubmitting(false);
          }
        });
    }
  });

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Map
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          formik={formik}
        />
      </Box>
      <ErrorPopup formik={formik} />
    </>
  );
}

export default Homepage;
