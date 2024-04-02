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
