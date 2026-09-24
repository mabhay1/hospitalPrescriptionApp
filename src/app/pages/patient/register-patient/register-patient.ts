import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPatientModel, IPatientResponse } from '../../../core/models/interfaces/patient.model';
import { PatientService } from '../../../core/services/patient-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { GlobalConstant } from '../../../core/constant/GlobalConstant';

@Component({
  imports: [ReactiveFormsModule,NgClass],
  selector: 'app-register-patient',
  styleUrl: './register-patient.css',
  templateUrl: './register-patient.html',
})
export class RegisterPatient {
  @Input() showBanner:boolean=true
  @Output() patientRegistered:EventEmitter<void> = new EventEmitter<void>()
  patientForm!:FormGroup;
  patientId:number=0
  genderList=GlobalConstant.GENDER_LIST
  constructor(private patientSrv:PatientService){
    this.initializeForm()
  }
  initializeForm(){
    this.patientForm=new FormGroup({
      fullName: new FormControl(""),
      gender: new FormControl(""),
      dateOfBirth: new FormControl(""),
      phone: new FormControl(""),
      address: new FormControl("")
    })
  }
  onResetForm(){
    this.patientForm.reset()
    this.patientId=0
  }
  onSaveForm(){
    const formValue:IPatientModel=this.patientForm.value
    this.patientSrv.registerPatient(formValue).subscribe({
      next:(res:IPatientResponse)=>{
        alert("Patient Regsitered Success")
        this.onResetForm()
        this.patientRegistered.emit()
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  onUpdateForm(){
    const formValue:IPatientModel=this.patientForm.value
    this.patientSrv.updatePatient(formValue,this.patientId).subscribe({
      next:(res:IPatientResponse)=>{
        alert("Patient Updated Success")
        this.onResetForm()
        this.patientRegistered.emit()
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
}
