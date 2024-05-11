import React, { createContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Check } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';
import { StateAlert } from '../Components';
import ApiErrorPopup from '../Modules/ApiErrorPopup';

export const RequestContext = createContext(null);

const RequestProvider = ({ children }) => {
  const [errorHeader, setErrorHeader] = useState('');
  const [errorBody, setErrorBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { t } = useTranslation();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('x-access-token')
    }
  });

  const filterNestedParams = (params) => {
    const filteredParams = {};
    for (const key in params) {
      const value = params[key];
      if (typeof value === 'object') {
        const nestedParams = filterNestedParams(value);
        if (Object.keys(nestedParams).length > 0) {
          filteredParams[key] = nestedParams;
        }
      } else if (value !== '' && value !== null && value !== undefined && value !== false) {
        filteredParams[key] = value;
      }
    }
    return filteredParams;
  };

  const useGetData = (queryKey, endpoint, options = {}, queryParams = {}) => {
    const filteredQueryParams = filterNestedParams(queryParams);

    const { isPending, isFetching, isSuccess, isError, data, error, refetch } = useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        const response = await axiosInstance.get(endpoint, {
          params: filteredQueryParams
        });
        return response.data;
      },
      ...options
    });

    useEffect(() => {
      setIsLoading(options.enabled ? isFetching : false);
    }, [isFetching]);

    useEffect(() => {
      if (isSuccess) {
        setIsLoading(false);
      }
    }, [isSuccess]);

    useEffect(() => {
      if (error) {
        setErrorBody(error);
      }
    }, [error]);

    return {
      isError,
      data,
      error,
      refetch
    };
  };

  const createData = useMutation({
    mutationFn: ({ endpoint, body }) => {
      return axiosInstance.post(endpoint, body);
    },
    onSuccess: () => {
      setIsLoading(false);
      setSuccessModal(true);
      setAlertText(t('stateAlert.text.savedSuccess'));
    },
    onError: (error) => {
      setErrorBody(error.response.data.data);
      setErrorHeader(error.response.data.message);
    },
    onMutate: () => {
      setIsLoading(true);
    }
  });

  const updateData = useMutation({
    mutationFn: ({ endpoint, body }) => {
      return axiosInstance.put(endpoint, body);
    },
    onSuccess: () => {
      setIsLoading(false);
      setSuccessModal(true);
      setAlertText(t('stateAlert.text.updateSuccess'));
    },
    onError: (error) => {
      setErrorBody(error.response.data.data);
      setErrorHeader(error.response.data.message);
    },
    onMutate: () => {
      setIsLoading(true);
    }
  });

  const deleteData = useMutation({
    mutationFn: ({ endpoint }) => {
      return axiosInstance.delete(endpoint);
    },
    onSuccess: () => {
      setIsLoading(false);
      setSuccessModal(true);
      setAlertText(t('stateAlert.text.deleteSuccess'));
    },
    onError: (error) => {
      setErrorBody(error.response.data.data);
      setErrorHeader(error.response.data.message);
    },
    onMutate: () => {
      setIsLoading(true);
    }
  });

  const values = {
    useGetData,
    createData,
    updateData,
    deleteData,
    errorHeader,
    errorBody,
    isLoading,
    axios: axiosInstance
  };

  return (
    <RequestContext.Provider value={values}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {children}
      <StateAlert
        open={successModal}
        autoHideDuration={1000}
        handleClose={() => setSuccessModal(false)}
        severity="success"
        alertTitle={t('stateAlert.title.success')}
        alertText={alertText}
        buttonText={t('common.close')}
        icon={<Check fontSize="inherit" />}
      />
      {/* <ApiErrorPopup /> */}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
