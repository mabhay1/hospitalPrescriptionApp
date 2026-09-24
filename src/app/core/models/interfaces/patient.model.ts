export interface IPatientResponse{
    patientId: number;
    fullName: string;
    gender: string;
    dateOfBirth: Date;
    phone: string;
    address: string;
    createdDate?: Date;
}

export interface IPatientModel{
  fullName: string,
  gender: string,
  dateOfBirth: Date,
  phone: string,
  address: string
}