import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { LanguageSwitcher, Login } from '../Components';
import { useTranslation } from 'react-i18next';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../Constants/Permissions';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loggedIn, logoutAccount, user, isLoginOpen, setIsLoginOpen } = useAuth();

  const settings =
    user?.role === ROLES.TRAVELER ? ['profile', 'logout'] : ['profile', 'properties', 'logout'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginButtonClick = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              ROTA
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                <MenuItem>
                  <LanguageSwitcher />
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              ROTA
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                m: 2,
                display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' }
              }}>
              <LanguageSwitcher />
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'center', md: 'flex' } }}>
              {loggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.firstName.concat(' ', user?.lastName).toUpperCase()}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={async () => {
                          if (setting === 'logout') {
                            logoutAccount(() => {
                              navigate('/');
                            });
                          }
                          if (setting === 'profile') {
                            navigate('/profile');
                          }

                          if (setting === 'properties') {
                            navigate('/properties');
                          }

                          handleCloseUserMenu();
                        }}>
                        <Typography textAlign="center">{t(`navbar.${setting}`)}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={handleLoginButtonClick}>
                  {t('navbar.login')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={loginDialogOpen} handleClose={handleLoginClose} onSuccess={handleLoginSuccess} />
    </>
  );
}
export default Navbar;
