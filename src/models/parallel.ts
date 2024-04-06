import { SubjectModel, TeacherModel } from ".";

export interface ParallelModel {
  id: number;
  name: string;
  teacher: TeacherModel;
  subject: SubjectModel;
}

export interface FormParallelModel {
  name: string;
  teacher: TeacherModel;
  subject: SubjectModel;
}

export interface FormParallelValidations {
  name: [(value: string) => boolean, string];
  teacher: [(value: TeacherModel) => boolean, string];
  subject: [(value: SubjectModel) => boolean, string];
}