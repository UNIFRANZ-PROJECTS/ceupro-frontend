import { PermissionModel } from ".";

export interface RoleModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}
