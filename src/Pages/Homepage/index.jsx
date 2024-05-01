import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ErrorPopup, Map } from '../../Components';
import { useFormik } from 'formik';
import { basicFormSchema } from '../../Schemas';

function Homepage() {
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const formik = useFormik({
    initialValues: {
      departurePoint: null,
      arrivalPoint: null,
      budget: ''
    },
    validationSchema: basicFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
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
