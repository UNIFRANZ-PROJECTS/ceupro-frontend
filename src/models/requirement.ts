
export interface RequirementModel {
  id: number;
  name: string;
  description: string;
}

export interface FormRequirementModel {
  name: string;
  description: string;
}

export interface FormRequirementValidations {
  name: [(value: string) => boolean, string];
  description: [(value: string) => boolean, string];
}

