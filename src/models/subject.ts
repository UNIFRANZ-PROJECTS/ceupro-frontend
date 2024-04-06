
export interface SubjectModel {
  id: number;
  name: string;
  code: string;
  semester: number;
}

export interface FormSubjectModel {
  name: string;
  semester: number;
}

export interface FormSubjectValidations {
  name: [(value: string) => boolean, string];
  semester: [(value: number) => boolean, string];
}
