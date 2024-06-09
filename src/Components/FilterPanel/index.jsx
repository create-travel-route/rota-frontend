import React from 'react';
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery
} from '@mui/material';
import { Tune } from '@mui/icons-material';
import MainButton from '../Button/MainButton';
import SecondaryButton from '../Button/SecondaryButton';
import Filter from '../Filter';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { Category } from '../../Constants/Category';

const FilterPanel = ({ formik, drawerOpen, setDrawerOpen }) => {
  const { t } = useTranslation();

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ px: '48px' }}>
      <Stack>
        <SecondaryButton onClick={handleDrawerOpen} startIcon={<Tune />}>
          {t('filterPanel.button.title')}
        </SecondaryButton>
      </Stack>
      <Drawer
        anchor={isSmallScreen ? 'bottom' : 'right'}
        height="50%"
        open={drawerOpen}
        onClose={handleDrawerClose}>
        <Box
          sx={{
            width: isSmallScreen ? '100%' : '400px',
            m: '20px',
            justifyContent: 'center'
          }}>
          <Filter title={t('filter.point')}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={formik.values.point}
                onChange={(_, newValue) => formik.setFieldValue('point', Number(newValue))}>
                <FormControlLabel value={0} control={<Radio />} label="0" />
                <FormControlLabel value={1} control={<Radio />} label="1" />
                <FormControlLabel value={2} control={<Radio />} label="2" />
                <FormControlLabel value={3} control={<Radio />} label="3" />
                <FormControlLabel value={4} control={<Radio />} label="4" />
                <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
          </Filter>
          <Filter title={t('filter.comment')}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={formik.values.comment}
                onChange={(_, newValue) => formik.setFieldValue('comment', Number(newValue))}>
                <FormControlLabel value={0} control={<Radio />} label="0-4" />
                <FormControlLabel value={1} control={<Radio />} label="5-10" />
                <FormControlLabel value={2} control={<Radio />} label="10+" />
                <FormControlLabel value={3} control={<Radio />} label="20+" />
              </RadioGroup>
            </FormControl>
          </Filter>
          <Filter title={t('input.category')}>
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
          </Filter>
          <Stack direction="row" spacing={2}>
            <MainButton
              color="error"
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  category: '',
                  comment: '',
                  point: ''
                });
              }}>
              {t('common.clear')}
            </MainButton>
            <MainButton
              onClick={() => {
                formik.handleSubmit();
                handleDrawerClose();
              }}>
              {t('button.createRoute')}
            </MainButton>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FilterPanel;
