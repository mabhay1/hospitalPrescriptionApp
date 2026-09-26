export interface IDashboardModel {
  fromDate: string
  toDate: string
  totalPatients: number
  totalMedicines: number
  totalStaff: number
  totalDoctors: number
  totalVisits: number
  currentVisits: number
  followUpVisits: number
  closedVisits: number
  totalPrescriptionItems: number
  topMedicines: ITopMedicine[]
  recentVisits: IRecentVisit[]
}

export interface ITopMedicine {
  medicineId: number
  medicineName: string
  strength: string
  form: string
  prescribedCount: number
}

export interface IRecentVisit {
  visitId: number
  patientId: number
  patientName: string
  doctorId: number
  doctorName: string
  visitDate: string
  diagnosis: string
  medicineCount: number
}
