import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface StudentModel {
  id: number;
  code: string;
  user: UserModel;
}

export interface FormStudentModel extends FormUserModel {
  code: string;
}

export interface FormStudentValidations extends FormUserValidations {
  code: [(value: string) => boolean, string];
}

