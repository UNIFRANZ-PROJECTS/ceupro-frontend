import { CategoryModel, SeasonModel, TypeProjectModel } from ".";

export interface ProjectModel {
  id: number;
  title: string;
  code: string;
  category: CategoryModel;
  typeProject: TypeProjectModel;
  season: SeasonModel;
}

export interface FormProjectModel {
  title: string;
  category: CategoryModel;
  typeProject: TypeProjectModel;
  season: SeasonModel;
}

export interface FormProjectValidations {
  title: [(value: string) => boolean, string];
  category: [(value: CategoryModel) => boolean, string];
  typeProject: [(value: TypeProjectModel) => boolean, string];
  season: [(value: SeasonModel) => boolean, string];
}