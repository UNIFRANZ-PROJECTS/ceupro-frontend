import { RequirementModel } from ".";

export interface StageModel {
  id: number;
  name: string;
  start: Date;
  end: Date;
  weighing:number;
  requirements:RequirementModel[]
}
