import { SeasonModel, TypeProjectModel } from ".";

export interface ProjectModel {
  id: number;
  title: string;
  code: string;
  category: TypeProjectModel;
  typeProject: TypeProjectModel;
  season: SeasonModel;
}

export interface FormProjectModel {
  title: string;
  category: TypeProjectModel|null;
  typeProject: TypeProjectModel|null;
  season: SeasonModel|null;
}

export interface FormProjectValidations {
  title: [(value: string) => boolean, string];
  category: [(value: TypeProjectModel) => boolean, string];
  typeProject: [(value: TypeProjectModel) => boolean, string];
  season: [(value: SeasonModel) => boolean, string];
}