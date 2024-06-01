import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Stack,
  Container,
  Grid,
  Rating,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useRequest from '../../Hooks/useRequest';
import ENDPOINTS from '../../Constants/Endpoints';
import { Category } from '../../Constants/Category';
import { Museum, Nightlife, Restaurant, ShoppingBag, SportsTennis } from '@mui/icons-material';
import dayjs from 'dayjs';
import { MainButton, QuestionPopUp } from '../../Components';
import useAuth from '../../Hooks/useAuth';
import { ROLES } from '../../Constants/Permissions';

const categoryIcons = {
  [Category.EatAndDrink]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 99, 71)', width: 120, height: 120 }}>
      <Restaurant />
    </Avatar>
  ),
  [Category.Historical]: (
    <Avatar sx={{ backgroundColor: 'rgb(60, 179, 113)', width: 120, height: 120 }}>
      <Museum />
    </Avatar>
  ),
  [Category.Entertainment]: (
    <Avatar sx={{ backgroundColor: 'rgb(138, 43, 226)', width: 120, height: 120 }}>
      <Nightlife />
    </Avatar>
  ),
  [Category.Sport]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 165, 0)', width: 120, height: 120 }}>
      <SportsTennis />
    </Avatar>
  ),
  [Category.Shopping]: (
    <Avatar sx={{ backgroundColor: 'rgb(255, 20, 147)', width: 120, height: 120 }}>
      <ShoppingBag />
    </Avatar>
  )
};

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { useGetData, deleteData } = useRequest();
  const { user, loading } = useAuth();
  const questionPopupRef = useRef();

  const { data: property } = useGetData('property', `${ENDPOINTS.properties}/${id}`, {
    enabled: !!id
  });

  const handleDelete = async () => {
    await deleteData.mutateAsync(
      {
        endpoint: `${ENDPOINTS.properties}/${id}`
      },
      {
        onSuccess: async () => {
          navigate('/properties');
        }
      }
    );
  };

  return (
    <Stack mb={3}>
      <Container>
        <Stack gap={3} mt={2}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Stack direction="column" justifyContent="flex-start" alignItems="center">
              {categoryIcons[property?.category]}
              {t(`category.${property?.category}`)}
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack
                  direction={{
                    xs: 'column',
                    md: 'row'
                  }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: 'header.main',
                      fontWeight: 'bold',
                      fontSize: '40px',
                      textAlign: 'center'
                    }}>
                    {property?.title}
                  </Typography>

                  <Rating
                    name="read-only"
                    value={Number(property?.rating)}
                    readOnly
                    precision={0.5}
                  />
                </Stack>
                <Typography component="span" variant="body2">
                  {property?.address}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {t('propertyDetail.createdDate')}
                  {dayjs(property?.createdAt).format('DD.MM.YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Stack>

          <Typography variant="body1" component="p">
            {property?.description}
          </Typography>
          <Typography variant="body1" component="p">
            {t('input.budget')}: {property?.budget} TL
          </Typography>
        </Stack>
        {!loading && (user?.role === ROLES.ADMIN || user?.id === property?.hostId) && (
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item xs={12} md={3} />
            <Grid item xs={12} md={3}>
              <MainButton onClick={() => navigate(`/update-property/${id}`)}>
                {t('button.updateProperty')}
              </MainButton>
            </Grid>
            <Grid item xs={12} md={3}>
              <MainButton color="error" onClick={() => questionPopupRef?.current?.openDialog()}>
                {t('button.delete')}
              </MainButton>
            </Grid>
          </Grid>
        )}
        <Stack my={2}>
          <Typography variant="h4">{t('propertyDetail.reviews')}</Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {property?.reviews.map((review, index) => (
              <>
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar alt={review.user} src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}>
                        <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#787878' }}>
                          {review.user}
                        </Typography>
                        <Rating size="small" value={review.rating} readOnly precision={0.5} />
                      </Stack>
                    }
                    secondary={review.comment}
                  />
                </ListItem>
                {index === property.reviews.length - 1 ? null : (
                  <Divider variant="inset" component="li" />
                )}
              </>
            ))}
          </List>
        </Stack>
      </Container>
      <QuestionPopUp ref={questionPopupRef} yesClick={handleDelete} />
    </Stack>
  );
};

export default PropertyDetail;
