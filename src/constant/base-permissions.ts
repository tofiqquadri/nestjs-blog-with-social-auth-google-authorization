export enum BasePermissionType {
  CREATE_POST = 'CREATE_POST',
  READ_POST = 'READ_POST',
  DELETE_POST = 'DELETE_POST',
  UPDATE_POST = 'UPDATE_POST',
}

export const NEW_USER_BASE_PERMISSIONS = [
  BasePermissionType.CREATE_POST,
  BasePermissionType.READ_POST,
  BasePermissionType.UPDATE_POST,
  BasePermissionType.DELETE_POST,
];
