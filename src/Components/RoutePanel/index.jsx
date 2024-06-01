import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Stack,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material';
import { Star } from '@mui/icons-material';
import MainButton from '../Button/MainButton';
import SecondaryButton from '../Button/SecondaryButton';
import { useTranslation } from 'react-i18next';
import { Category } from '../../Constants/Category';
import { Museum, Nightlife, Restaurant, ShoppingBag, SportsTennis } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateAndComment from '../RateAndComment';

const categoryIcons = {
  [Category.EatAndDrink]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 99, 71)' }}>
      <Restaurant />
    </Avatar>
  ),
  [Category.Historical]: (
    <Avatar sx={{ backgroundColor: 'rgb(60, 179, 113)' }}>
      <Museum />
    </Avatar>
  ),
  [Category.Entertainment]: (
    <Avatar sx={{ backgroundColor: 'rgb(138, 43, 226)' }}>
      <Nightlife />
    </Avatar>
  ),
  [Category.Sport]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 165, 0)' }}>
      <SportsTennis />
    </Avatar>
  ),
  [Category.Shopping]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 20, 147)' }}>
      <ShoppingBag />
    </Avatar>
  )
};

const RoutePanel = ({ properties, drawerOpen, setDrawerOpen }) => {
  const { t } = useTranslation();
  const [DialogOpen, setDialogOpen] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleButtonClick = (id) => {
    setDialogOpen(true);
    setPropertyId(id);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Box sx={{ px: '48px' }}>
        <Stack>
          <SecondaryButton
            onClick={handleDrawerOpen}
            startIcon={<Star />}
            disabled={properties?.length === 0}>
            {t('routePanel.button.title')}
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
            <Stack spacing={2}>
              {properties.map((property, index) => (
                <List
                  key={property.id}
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem
                    onClick={() => {
                      index === 0 || index === properties.length - 1
                        ? null
                        : handleButtonClick(property.id);
                    }}
                    sx={{ cursor: 'pointer' }}>
                    <ListItemAvatar>
                      {categoryIcons[property.category] ?? <LocationOnIcon color="error" />}
                    </ListItemAvatar>
                    <ListItemText
                      primary={property.title.toUpperCase()}
                      secondary={`${t(' input.budget ')} : ${property.budget} TL`}
                    />
                  </ListItem>
                </List>
              ))}
            </Stack>
            <MainButton
              onClick={() => {
                handleDrawerClose();
              }}>
              {t('common.close')}
            </MainButton>
          </Box>
        </Drawer>
      </Box>
      <RateAndComment open={DialogOpen} handleClose={handleClose} propertyId={propertyId} />
    </>
  );
};

export default RoutePanel;
