
export interface TypeProjectModel {
  id: number;
  name: string;
}

export interface FormTypeProjectModel {
  name: string;
}

export interface FormTypeProjectValidations {
  name: [(value: string) => boolean, string];
}