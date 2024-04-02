import { RoleModel, UserModel } from ".";

export interface StaffModel {
  id: number;
  role: RoleModel;
  user: UserModel;
}
