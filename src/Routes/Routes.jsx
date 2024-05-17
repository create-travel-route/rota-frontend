import { PERMISSIONS } from '../Constants/Permissions';
import { CreatePropertyPage, Profile } from '../Pages';

export const routes = [
  {
    path: '/create-property',
    element: CreatePropertyPage,
    permissions: [PERMISSIONS.CREATE_PROPERTY]
  },
  {
    path: '/update-property/:id',
    element: CreatePropertyPage,
    permissions: [PERMISSIONS.UPDATE_PROPERTY],
    params: { isUpdate: true }
  },
  {
    path: '/profile',
    element: Profile,
    permissions: [PERMISSIONS.PROFILE]
  }
];
