import { RequirementModel } from ".";

export interface TypeProjectModel {
  id: number;
  name: string;
  start: Date;
  end: Date;
  weighing:number;
  requirements:RequirementModel[]
}

export interface FormTypeProjectModel {
  name: string;
  start: Date|null;
  end: Date|null;
  weighing: number;
  requirements: RequirementModel[];
}

export interface FormTypeProjectValidations {
  name: [(value: string) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
  weighing: [(value: number) => boolean, string];
  requirements: [(value: RequirementModel[]) => boolean, string];
}
