import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitService } from '../../core/services/visit-service';
import { PatientService } from '../../core/services/patient-service';
import { IPatientModel, IPatientResponse } from '../../core/models/interfaces/patient.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetInitialsPipe } from '../../shared/pipes/get-initials-pipe';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { IPrescriptionItem, IPrescriptionModel, IVisitListModel } from '../../core/models/interfaces/IVisit.model';
import { VisitStatus } from '../../core/enum/Role.enum';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicineMasterService } from '../../core/services/medicine-master-service';
import { Observable } from 'rxjs';
import { IMedicineResponse } from '../../core/models/interfaces/medicine.model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { VisitModel } from '../../core/models/classes/Visit.model';

@Component({
  imports: [GetInitialsPipe,DatePipe,NgClass,ReactiveFormsModule,AsyncPipe,FormsModule],
  selector: 'app-open-visit',
  styleUrl: './open-visit.css',
  templateUrl: './open-visit.html',
})
export class OpenVisit implements OnInit {
  currentPatientId =0
  patientListObservable$=new Observable<IPatientResponse[]>
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
  medicineSrv=inject(MedicineMasterService)
  prescriptionForm!:FormGroup

  medicineListObs$:Observable<IMedicineResponse[]>=new Observable<IMedicineResponse[]>
  medicineFormList=GlobalConstant.MEDICINE_FORM_LIST
  visitStatusList=GlobalConstant.VISIT_STATUS_LIST
  visitStatus=VisitStatus
  constructor(private activatedRoute:ActivatedRoute,private router:Router){
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        this.currentPatientId =res.patientId
        if(this.currentPatientId!=0){
          this.getCurrentPatientById()
          this.getCurrentPatientVisits()
        }
      }
    })
    this.prescriptionForm = new FormGroup({
      visitId: new FormControl(0),
      medicineId: new FormControl(0),
      dosage: new FormControl(""),
      frequency: new FormControl(""),
      durationDays: new FormControl(0),
      instructions: new FormControl("")
    })
  }
  ngOnInit(): void {
    this.medicineListObs$=this.medicineSrv.getAllMedicines()
    this.patientListObservable$=this.patientSrv.getAllPatients()
  }
  openSelectedPatient(event:any){
    this.router.navigate(['/open-visit',event.target.value])
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
        actualVisits.sort((a,b)=>new Date(b.visitDate).getTime()-new Date(a.visitDate).getTime())
        const notClosedVisits=actualVisits.filter(visit=>visit.visitStatus!==VisitStatus.CLOSED)

        if(notClosedVisits.length===0){
          this.selectedVisit=actualVisits[0]
        }
        else{
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
  changeStatus(event:any){
    const visitObj= new VisitModel()
    visitObj.patientId= this.currentPatientId,
    visitObj.doctorId= this.selectedVisit?.doctorId,
    visitObj.visitDate= new Date(this.selectedVisit?.visitDate),
    visitObj.symptoms= this.selectedVisit?.symptoms,
    visitObj.diagnosis= this.selectedVisit?.diagnosis;
    visitObj.visitStatus= event.target.value;
    debugger
    this.visitSrv.updateVisit(visitObj,this.selectedVisit?.visitId).subscribe({
      next:(res:IVisitListModel)=>{
        debugger
        alert("Status updated")
        this.getCurrentPatientVisits()
      },
      error:(err:HttpErrorResponse)=>{
        debugger
      }
    })
  }
  onSavePrescription(){
    const formObj:IPrescriptionModel=this.prescriptionForm.value
    formObj.visitId=this.selectedVisit?.visitId
    this.visitSrv.addPrescriptionItem(formObj).subscribe({
      next:(res:IPrescriptionItem)=>{
        alert("Medicine added successfully")
        this.getCurrentPatientVisits()
        this.onResetPrescriptionForm()
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  onResetPrescriptionForm(){
    this.prescriptionForm.reset()
  }
}
