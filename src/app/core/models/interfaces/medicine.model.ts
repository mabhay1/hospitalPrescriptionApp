export interface IMedicineModel{
  name: string;
  strength: string;
  form: string;
}

export interface IMedicineResponse extends IMedicineModel{
  medicineId: number;
}