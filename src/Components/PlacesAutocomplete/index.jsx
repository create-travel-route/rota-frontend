import React, { useCallback, useEffect, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Autocomplete, Box, Grid, Stack, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import Input from '../Input';
import parse from 'autosuggest-highlight/parse';
import { useTranslation } from 'react-i18next';

const PlacesAutocomplete = ({ onPlaceSelect, ...props }) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const { t } = useTranslation();

  const [sessionToken, setSessionToken] = useState();
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [predictionResults, setPredictionResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  useEffect(() => {
    setInputValue(props.selectedPlace ?? '');
  }, [props.selectedPlace]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event) => {
      const value = event.target?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
        sessionToken
      };

      const detailsRequestCallback = (placeDetails) => {
        onPlaceSelect({
          ...placeDetails,
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng()
        });
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
        props.formik.setFieldValue(props.name, {
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng()
        });
        if (props.setLatLng) {
          props.setLatLng({
            lat: placeDetails.geometry.location.lat(),
            lng: placeDetails.geometry.location.lng()
          });
        }
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
      setPredictionResults([]);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <Stack>
      <Autocomplete
        id="google-map-demo"
        sx={{
          width: 300,
          '& .MuiAutocomplete-noOptions': {
            display: 'none'
          }
        }}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={predictionResults}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={inputValue}
        noOptionsText={t('map.noOptions')}
        onChange={(event, newValue) => {
          setPredictionResults(newValue ? [newValue, ...predictionResults] : predictionResults);
          setInputValue(newValue ? newValue : '');
          props.formik.setFieldValue(props.name, newValue ? newValue : null);
          if (props.setLatLng && !newValue) {
            props.setLatLng(null);
          }
        }}
        disableCloseOnSelect={true}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <Input
            {...params}
            label={props.label}
            value={props.value}
            onBlur={props.onBlur}
            error={props.error}
            required={props.required}
            onInput={(event) => onInputChange(event)}
          />
        )}
        renderOption={(props, option) => {
          const matches = option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );
          return (
            <li {...props} onClick={() => handleSuggestionClick(option.place_id)}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <LocationOn sx={{ color: 'text.secondary' }} />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Stack>
  );
};

export default PlacesAutocomplete;
