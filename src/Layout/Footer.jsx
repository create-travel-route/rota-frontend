import React from 'react';
import { Container, Typography, Link, Box, IconButton } from '@mui/material';
import { FacebookRounded, Instagram, Twitter } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  const footerNav = [
    {
      id: 1,
      title: 'footer.about',
      links: [
        'footer.about.aboutUs',
        'footer.about.features',
        'footer.about.news',
        'footer.about.menu'
      ]
    },
    {
      id: 2,
      title: 'footer.company',
      links: [
        'footer.company.whyHP',
        'footer.company.partners',
        'footer.company.faq',
        'footer.company.blog'
      ]
    },
    {
      id: 3,
      title: 'footer.support',
      links: [
        'footer.support.account',
        'footer.support.supportCenter',
        'footer.support.feedback',
        'footer.support.contact'
      ]
    }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'footer.main',
        py: {
          xs: 5,
          lg: 8
        },
        width: '100%'
      }}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          px: {
            xs: 2,
            sm: 5,
            md: 10
          },
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row'
          },
          alignItems: {
            xs: 'center',
            lg: 'flex-start'
          },
          justifyContent: 'space-between',
          gap: 8
        }}>
        <Box
          sx={{
            maxWidth: {
              xs: 'auto',
              lg: '355px'
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              lg: 'flex-start'
            }
          }}>
          <Typography variant="h6">ROTA</Typography>
          <Typography
            sx={{
              mt: 3,
              mb: 4,
              fontWeight: '400',
              fontSize: '13px',
              lineHeight: '19.5px',
              color: '#5B5B5B',
              textAlign: {
                xs: 'center',
                lg: 'left'
              }
            }}>
            {t('project.description')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
            <IconButton>
              <FacebookRounded color="primary" fontSize="large" />
            </IconButton>
            <IconButton>
              <Twitter color="primary" fontSize="large" />
            </IconButton>
            <IconButton>
              <Instagram color="primary" fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: {
              xs: '100%',
              md: 'auto'
            },
            gap: {
              xs: 2,
              sm: 8
            },
            justifyContent: {
              xs: 'space-between',
              lg: 'flex-start'
            }
          }}>
          {footerNav.map((item) => (
            <Box key={item.id}>
              <Typography variant="subtitle1">{t(item.title)}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5
                }}>
                {item.links.map((link, index) => (
                  <Link
                    key={index}
                    href="#"
                    underline="none"
                    color="#5B5B5B"
                    sx={{
                      width: 'fit-content',
                      fontWeight: '400',
                      fontSize: '13px',
                      '&:hover': {
                        color: '#161414'
                      }
                    }}>
                    {t(link)}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              lg: 'flex-start'
            },
            gap: 2.5,
            maxWidth: {
              xs: 'auto',
              lg: '388px'
            }
          }}>
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: {
                xs: '14px',
                sm: '18px'
              },
              color: '#161414',
              textAlign: {
                xs: 'center',
                lg: 'left'
              }
            }}>
            {t('footer.subscribe')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              alignItems: 'center',
              gap: 2,
              position: 'relative'
            }}
          />
        </Box>
      </Container>
      <Box mt={5}>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="primary" href="/">
            Rota
          </Link>{' '}
          {year}.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
