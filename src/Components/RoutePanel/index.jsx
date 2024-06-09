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
import { Park, Star } from '@mui/icons-material';
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
  ),
  [Category.Nature]: (
    <Avatar sx={{ backgroundColor: 'rgb(139,195,74)' }}>
      <Park />
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
              {properties
                .slice()
                .sort((a, b) => {
                  if (a.title.startsWith('Başlangıç') && !b.title.startsWith('Başlangıç')) {
                    return -1; // Move items starting with 'start' to the beginning
                  } else if (!a.title.startsWith('Başlangıç') && b.title.startsWith('Başlangıç')) {
                    return 1; // Move items not starting with 'start' to the end
                  } else if (a.title.endsWith('Bitiş') && !b.title.endsWith('Bitiş')) {
                    return 1; // Move items ending with 'end' to the end
                  } else if (!a.title.endsWith('Bitiş') && b.title.endsWith('Bitiş')) {
                    return -1; // Move items not ending with 'end' to the beginning
                  } else {
                    return 0; // Maintain original order for other items
                  }
                })
                .map((property, index) => (
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
                        primary={property.title}
                        secondary={
                          index === 0 || index === properties.length - 1
                            ? null
                            : `${t('input.budget')} : ${property.budget} TL`
                        }
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
