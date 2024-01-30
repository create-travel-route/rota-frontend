export const ROLES = {
  TRAVELER: 'Traveler',
  HOST: 'Host',
  ADMIN: 'Admin',
  GUEST: 'Guest'
};

// izinler
export const PERMISSIONS = {};

// kullanici izinleri eklenir
export const USER_PERMISSIONS = [
  { role: ROLES.ADMIN, permissions: Object.values(PERMISSIONS) },
  { role: ROLES.HOST, permissions: Object.values(PERMISSIONS) },
  {
    role: ROLES.TRAVELER,
    permissions: Object.values(PERMISSIONS)
  },
  {
    role: ROLES.GUEST,
    permissions: []
  }
];
