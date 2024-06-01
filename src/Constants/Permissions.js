export const ROLES = {
  TRAVELER: 'Traveler',
  HOST: 'Host',
  ADMIN: 'Admin',
  GUEST: 'Guest'
};

// izinler
export const PERMISSIONS = {
  CREATE_PROPERTY: 'can_create_property',
  UPDATE_PROPERTY: 'can_update_property',
  PROFILE: 'can_view_profile',
  PROPERTIES: 'can_view_properties',
  PROPERTY_DETAIL: 'can_view_property_detail'
};

// kullanici izinleri eklenir
export const USER_PERMISSIONS = [
  { role: ROLES.ADMIN, permissions: Object.values(PERMISSIONS) },
  { role: ROLES.HOST, permissions: Object.values(PERMISSIONS) },
  {
    role: ROLES.TRAVELER,
    permissions: [PERMISSIONS.PROFILE]
  },
  {
    role: ROLES.GUEST,
    permissions: []
  }
];
