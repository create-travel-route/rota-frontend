import { PERMISSIONS } from '../Constants/Permissions';
import { CreatePropertyPage, Profile, PropertyDetail, PropertyList } from '../Pages';

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
  },
  {
    path: '/properties',
    element: PropertyList,
    permissions: [PERMISSIONS.PROPERTIES]
  },
  {
    path: '/properties/:id',
    element: PropertyDetail,
    permissions: [PERMISSIONS.PROPERTY_DETAIL]
  }
];
