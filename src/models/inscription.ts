import { SeasonModel, StaffModel, StudentModel } from ".";

export interface InscriptionModel {
  id: number;
  total: number;
  amountDelivered: number;
  returnedAmount: number;
  url: string;
  student:StudentModel;
  staff:StaffModel;
  season:SeasonModel;
}

export interface FormInscriptionModel {
  total: number;
  amountDelivered: number;
  returnedAmount: number;
  student:StudentModel;
  staff:StaffModel;
  season:SeasonModel;
}

export interface FormInscriptionValidations {
  total: [(value: number) => boolean, string];
  amountDelivered: [(value: number) => boolean, string];
  returnedAmount: [(value: number) => boolean, string];
  student: [(value: StudentModel) => boolean, string];
  staff: [(value: StaffModel) => boolean, string];
  season: [(value: SeasonModel) => boolean, string];
}


