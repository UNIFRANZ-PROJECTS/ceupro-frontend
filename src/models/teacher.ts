import { UserModel } from ".";

export interface TeacherModel {
  id: number;
  ci: string;
  user: UserModel;
}
