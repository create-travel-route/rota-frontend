import React, { useState } from 'react';
import { MenuItem, Box, Menu, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const languages = [
  { value: 'tr', label: 'Türkçe', code: 'TR' },
  { value: 'en', label: 'English', code: 'EN' }
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
      <Typography
        sx={{ cursor: 'pointer' }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        {selectedLanguage.code}
      </Typography>
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
              {option.code} - <Typography>{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
