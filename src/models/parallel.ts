import { SubjectModel, TeacherModel } from ".";

export interface ParallelModel {
  id: number;
  name: string;
  teacher: TeacherModel;
  subject: SubjectModel;
}
