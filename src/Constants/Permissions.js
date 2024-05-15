export const ROLES = {
  TRAVELER: 'Traveler',
  HOST: 'Host',
  ADMIN: 'Admin',
  GUEST: 'Guest'
};

// izinler
export const PERMISSIONS = {
  CREATE_PROPERTY: 'can_create_property',
  UPDATE_PROPERTY: 'can_update_property'
};

// kullanici izinleri eklenir
export const USER_PERMISSIONS = [
  { role: ROLES.ADMIN, permissions: Object.values(PERMISSIONS) },
  { role: ROLES.HOST, permissions: Object.values(PERMISSIONS) },
  {
    role: ROLES.TRAVELER,
    permissions: []
  },
  {
    role: ROLES.GUEST,
    permissions: []
  }
];
