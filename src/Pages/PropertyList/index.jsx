import * as React from 'react';
import {
  Box,
  Container,
  ListItemButton,
  Rating,
  Stack,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@mui/material';
import { Add, Museum, Nightlife, Restaurant, ShoppingBag, SportsTennis } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useRequest from '../../Hooks/useRequest';
import ENDPOINTS from '../../Constants/Endpoints';
import { Category } from '../../Constants/Category';
import { MainButton } from '../../Components';

const categoryIcons = {
  [Category.EatAndDrink]: <Restaurant />,
  [Category.Historical]: <Museum />,
  [Category.Entertainment]: <Nightlife />,
  [Category.Sport]: <SportsTennis />,
  [Category.Shopping]: <ShoppingBag />
};

function PropertyList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { useGetData } = useRequest();
  const { user } = useAuth();

  // hostIdye gore getir
  const { data: properties } = useGetData(
    'properties',
    `${ENDPOINTS.properties}?hostId=${user?.id}`,
    {
      enabled: !!user
    }
  );

  console.log(properties);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Typography
          sx={{
            color: 'header.main',
            fontWeight: 'bold',
            fontSize: '32px',
            textAlign: 'center',
            mt: 1
          }}
          gutterBottom>
          {t('navbar.properties')}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
          <MainButton
            sx={{
              width: 'auto'
            }}
            color="success"
            startIcon={<Add />}
            onClick={() => navigate('/create-property')}>
            {t('button.createProperty')}
          </MainButton>
        </Stack>
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', mt: 2 }}>
          {properties?.map((property) => (
            <React.Fragment key={property.id}>
              <ListItem alignItems="flex-start">
                <ListItemButton onClick={() => navigate(`/properties/${property.id}`)}>
                  <ListItemAvatar>
                    <Avatar>{categoryIcons[property.category]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}>
                          <Stack direction="column">
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="h6"
                              color="text.primary">
                              {property.title}
                            </Typography>
                            <Typography
                              sx={{ display: 'block', fontWeight: 'bold' }}
                              component="span"
                              variant="body2"
                              color="text.secondary">
                              {property.address}
                            </Typography>
                          </Stack>
                          <Rating name="read-only" size="small" value={property.rating} readOnly />
                        </Stack>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {property.description}
                        </Typography>

                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.secondary">
                          <Typography
                            sx={{ display: 'inline', fontWeight: 'bold' }}
                            component="span"
                            variant="body2"
                            color="text.secondary">
                            {t('input.budget')}:
                          </Typography>
                          {property.budget} TL
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Box>
  );
}
export default PropertyList;
