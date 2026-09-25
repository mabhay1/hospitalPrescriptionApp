import { VisitStatusType } from "../types/Visit.type";

export interface IVisitListModel {
  visitId: number;
  patientId: number;
  patientName?: string;
  patientPhone?: string;
  patientGender?: string;
  patientDateOfBirth?: string;
  patientAddress?: string;
  patientCreatedDate?: string;
  doctorId: number;
  doctorName: string;
  doctorEmail: string;
  doctorMobileNo: string;
  doctorPassword: string;
  doctorRoleId: number;
  doctorRoleName: string;
  doctorProjectName: string;
  doctorIsActive: boolean;
  doctorCreatedOn: string;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  visitStatus: VisitStatusType;
  prescriptionItems: IPrescriptionItem[]
}

export interface IPrescriptionItem {
  prescriptionItemId: number;
  visitId: number;
  visitDate?: string,
  visitStatus?: VisitStatusType,
  patientId?: number,
  patientName?: string,
  doctorId?: number,
  doctorName?: string,
  medicineId: number;
  medicineName: string;
  medicineStrength: string;
  medicineForm: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions: string;
}
export interface IPrescriptionModel{
  visitId: number;
  medicineId: number;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions: string;
}