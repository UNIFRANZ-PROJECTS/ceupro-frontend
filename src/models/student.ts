import { UserModel } from ".";

export interface StudentModel {
  id: number;
  code: string;
  user: UserModel;
}
