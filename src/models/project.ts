import { CategoryModel, SeasonModel, TypeProjectModel } from ".";

export interface ProjectModel {
  id: number;
  title: string;
  code: string;
  category: CategoryModel;
  typeProject: TypeProjectModel;
  season: SeasonModel;
}
