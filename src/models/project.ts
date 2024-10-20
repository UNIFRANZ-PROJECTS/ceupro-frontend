import { ParallelModel, SeasonModel, StudentModel, TypeProjectModel } from ".";

export interface ProjectModel {
  id: number;
  title: string;
  code: string;
  category: TypeProjectModel;
  typeProject: TypeProjectModel;
  season: SeasonModel;
  students:StudentModel[];
  parallels:ParallelModel[];
}

export interface FormProjectModel {
  title: string;
  category: TypeProjectModel|null;
  typeProject: TypeProjectModel|null;
  students:StudentModel[];
  parallels:ParallelModel[];
}

export interface FormProjectValidations {
  title: [(value: string) => boolean, string];
  category: [(value: TypeProjectModel) => boolean, string];
  typeProject: [(value: TypeProjectModel) => boolean, string];
  students: [(value: StudentModel[]) => boolean, string];
  parallels: [(value: ParallelModel[]) => boolean, string];
}