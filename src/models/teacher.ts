import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface TeacherModel {
  id: number;
  ci: string;
  user: UserModel;
}

export interface FormTeacherModel extends FormUserModel {
  ci: string;
}

export interface FormTeacherValidations extends FormUserValidations {
  ci: [(value: string) => boolean, string];
}

