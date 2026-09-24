import { Component, inject, OnInit, signal } from '@angular/core';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.model';
import { VisitService } from '../../core/services/visit-service';
import { AsyncPipe, DatePipe, NgClass, SlicePipe } from '@angular/common';
import { Role, VisitStatus } from '../../core/enum/Role.enum';
import { PatientService } from '../../core/services/patient-service';
import { UserService } from '../../core/services/user-service';
import { Observable } from 'rxjs';
import { IPatientResponse } from '../../core/models/interfaces/patient.model';
import { IUserResponse } from '../../core/models/interfaces/User.model';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitModel } from '../../core/models/classes/Visit.model';
import { FormsModule } from '@angular/forms';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe,NgClass,SlicePipe,AsyncPipe,FormsModule,RouterLink],
  selector: 'app-visit',
  styleUrl: './visit.css',
  templateUrl: './visit.html',
})
export class Visit implements OnInit {
  isFormVisible:boolean=false

  visitStatus=VisitStatus
  visitStatusList=GlobalConstant.VISIT_STATUS_LIST
  visitList=signal<IVisitListModel[]>([])

  visitSrv=inject(VisitService)
  patientSrv=inject(PatientService)
  userSrv=inject(UserService)

  patientListObs$:Observable<IPatientResponse[]>= new Observable<IPatientResponse[]>()
  doctorListObs$:Observable<IUserResponse[]>=new Observable<IUserResponse[]>()

  visitForm:VisitModel=new VisitModel()
  visitId:number=0
  ngOnInit(): void {
    this.getAllVisits()
    this.patientListObs$=this.patientSrv.getAllPatients()
    this.doctorListObs$= this.userSrv.filterUser(Role.DOCTOR)
  }
  openCloseVisitForm(formVisible:boolean){
    this.isFormVisible= formVisible
  }
  getAllVisits(){
    this.visitSrv.getAllVisits().subscribe({
      next:(res:IVisitListModel[])=>{
        this.visitList.set(res)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  onEdit(obj:IVisitListModel){
    this.visitId=obj.visitId
    this.visitForm.patientId=obj.patientId
    this.visitForm.doctorId = obj.doctorId;
    this.visitForm.visitDate= new Date(obj.visitDate);
    this.visitForm.symptoms = obj.symptoms;
    this.visitForm.diagnosis = obj.diagnosis;
    this.visitForm.visitStatus = obj.visitStatus;
    this.openCloseVisitForm(true)
  }
  onDelete(id:number){
    const isDelete=confirm("Are you sure want to delete!!")
    if(isDelete){
      this.visitSrv.deleteVisit(id).subscribe({
        next:(res)=>{
          alert("Visit Deleted success")
          this.getAllVisits()
        },
        error:(err:HttpErrorResponse)=>{
          alert("API Error")
        }
      })
    }
  }
  onSaveVisit(){
    this.visitSrv.createVisit(this.visitForm).subscribe({
      next:(res:IVisitListModel)=>{
        alert("Visit Created success")
        this.getAllVisits()
        this.onResetVisitForm()
        this.openCloseVisitForm(false)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  onResetVisitForm(){
    this.visitForm=new VisitModel()
    this.visitId=0
  }
  onUpdateVisit(){
    this.visitSrv.updateVisit(this.visitForm,this.visitId).subscribe({
      next:(res:IVisitListModel)=>{
        alert("Visit Updated success")
        this.getAllVisits()
        this.onResetVisitForm()
        this.openCloseVisitForm(false)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
}
