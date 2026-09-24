import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitService } from '../../core/services/visit-service';
import { PatientService } from '../../core/services/patient-service';
import { IPatientResponse } from '../../core/models/interfaces/patient.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetInitialsPipe } from '../../shared/pipes/get-initials-pipe';
import { DatePipe, NgClass } from '@angular/common';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.model';
import { VisitStatus } from '../../core/enum/Role.enum';

@Component({
  imports: [GetInitialsPipe,DatePipe,NgClass],
  selector: 'app-open-visit',
  styleUrl: './open-visit.css',
  templateUrl: './open-visit.html',
})
export class OpenVisit {
  currentPatientId:number=0
  currentPatientDetail=signal<IPatientResponse>({
    patientId: 0,
    fullName: '',
    gender: '',
    dateOfBirth: new Date(),
    phone: '',
    address: ''
  })
  currentPatientVisits=signal<IVisitListModel[]>([])
  selectedVisit!:IVisitListModel
  visitSrv=inject(VisitService)
  patientSrv=inject(PatientService)
  constructor(private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        this.currentPatientId=res.patientId
        this.getCurrentPatientById()
        this.getCurrentPatientVisits()
      }
    })
  }
  getCurrentPatientById(){
    this.patientSrv.getPatientById(this.currentPatientId).subscribe({
      next:(res:IPatientResponse)=>{
        this.currentPatientDetail.set(res)
      },
      error:(err:HttpErrorResponse)=>{
        console.log("API Error")
      }
    })
  }
  getCurrentPatientVisits(){
    this.visitSrv.getVisitsByPatientId(this.currentPatientId).subscribe({
      next:(res:IVisitListModel[])=>{
        this.currentPatientVisits.set(res)
        const actualVisits=structuredClone(res)
        const notClosedVisits=actualVisits.filter(visit=>visit.visitStatus!==VisitStatus.CLOSED)

        if(notClosedVisits.length===0){
          actualVisits.sort((a,b)=>new Date(b.visitDate).getTime()-new Date(a.visitDate).getTime())
          this.selectedVisit=actualVisits[0]
        }
        else{
          notClosedVisits.sort((a,b)=>new Date(b.visitDate).getTime()-new Date(a.visitDate).getTime())
          this.selectedVisit=notClosedVisits[0]
        }

      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  openSelectedVisit(selectedVisitItem:IVisitListModel){
    this.selectedVisit=selectedVisitItem
  }
}
