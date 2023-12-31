import React, { createContext, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const RequestContext = createContext(null);

const RequestProvider = ({ children }) => {
  const [errorHeader, setErrorHeader] = useState('');
  const [errorBody, setErrorBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*'
      //'x-access-token': localStorage.getItem('x-access-token')
    }
  });

  const useGetData = (queryKey, endpoint, params, options = {}) => {
    const { isPending, isError, data, error } = useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        const response = await axiosInstance.get(endpoint, {
          params
        });
        return response.data;
      },
      ...options
    });

    if (isPending) {
      setIsLoading(isPending);
    }

    return {
      isError,
      data,
      error
    };
  };

  const createData = useMutation({
    mutationFn: ({ endpoint, body }) => {
      return axiosInstance.post(endpoint, body);
    },
    onSuccess: () => {},
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
    onSuccess: () => {},
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
    onSuccess: () => {},
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
    isLoading
  };

  return <RequestContext.Provider value={values}>{children}</RequestContext.Provider>;
};

export default RequestProvider;
