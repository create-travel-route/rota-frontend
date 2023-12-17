import React, { useState } from 'react';
import { MenuItem, Box, Menu, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const languages = [
  { value: 'tr', label: 'Türkçe', code: 'TR' },
  { value: 'en', label: 'English', code: 'US' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((l) => l.value === i18n.language)
  );

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <img
          loading="lazy"
          width="30"
          srcSet={`https://flagcdn.com/w40/${selectedLanguage.code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${selectedLanguage.code.toLowerCase()}.png`}
          alt=""
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {languages.map((option) => (
          <MenuItem key={option.value} onClick={(event) => handleMenuItemClick(event, option)}>
            <Stack direction="row" spacing={2}>
              <img
                loading="lazy"
                width="30"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              <Typography>{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
