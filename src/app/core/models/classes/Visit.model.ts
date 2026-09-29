import { VisitStatus } from "../../enum/Role.enum";
import { VisitStatusType } from "../types/Visit.type";

export class VisitModel{
  patientId: number;
  doctorId: number;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  visitStatus: VisitStatusType;
  constructor(){
    this.patientId = 0;
    this.doctorId = 0;
    this.visitDate= "";
    this.symptoms = '';
    this.diagnosis = '';
    this.visitStatus = VisitStatus.CURRENT;
  }
}