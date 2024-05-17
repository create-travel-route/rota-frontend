import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe'; // Kategori ikonu örneği
import MuseumIcon from '@mui/icons-material/Museum';
import { Box, Container, ListItemButton, Rating, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const places = [
  {
    id: 1,
    title: 'Mavi Durak',
    description: 'Kafelerin bulunduğu cadde',
    category: 'EatAndDrink',
    address: 'Mavi Durak, Serdivan, Sakarya',
    location: {
      type: 'Point',
      coordinates: [30.361476, 40.762381]
    },
    budget: 100,
    rating: 4.5,
    hostId: null
  },
  {
    id: 2,
    title: 'Serdivan',
    description: 'Avm bulunduğu cadde',
    category: 'Museum',
    address: ' Serdivan, Sakarya',
    location: {
      type: 'Point',
      coordinates: [30.361476, 40.762381]
    },
    budget: 500,
    rating: 4.0,
    hostId: null
  }

  // Diğer mekanlar burada tanımlanabilir
];

const categoryIcons = {
  EatAndDrink: <LocalCafeIcon />,
  Museum: <MuseumIcon />
  // Diğer kategoriler için ikonlar eklenebilir
};

function PropertyList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', mt: 2 }}>
          {places.map((place) => (
            <React.Fragment key={place.id}>
              <ListItem alignItems="flex-start">
                <ListItemButton onClick={() => navigate(`/property-list/${place.id}`)}>
                  <ListItemAvatar>
                    <Avatar>{categoryIcons[place.category]}</Avatar>
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
                              {place.title}
                            </Typography>
                            <Typography
                              sx={{ display: 'block', fontWeight: 'bold' }}
                              component="span"
                              variant="body2"
                              color="text.secondary">
                              {place.address}
                            </Typography>
                          </Stack>
                          <Rating name="read-only" size="small" value={place.rating} readOnly />
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
                          {place.description}
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
                          {place.budget} TL
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
