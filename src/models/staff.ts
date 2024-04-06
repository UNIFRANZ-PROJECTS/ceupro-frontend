import { FormUserModel, FormUserValidations, RoleModel, UserModel } from ".";

export interface StaffModel {
  id: number;
  role: RoleModel;
  user: UserModel;
}

export interface FormStaffModel extends FormUserModel {
  role: RoleModel;
}

export interface FormStaffValidations extends FormUserValidations {
  role: [(value: RoleModel) => boolean, string];
}


