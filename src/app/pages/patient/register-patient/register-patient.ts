import { Component, DestroyRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPatientModel, IPatientResponse } from '../../../core/models/interfaces/patient.model';
import { PatientService } from '../../../core/services/patient-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { GlobalConstant } from '../../../core/constant/GlobalConstant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShowValidationMessage } from '../../../shared/components/show-validation-message/show-validation-message';

@Component({
  imports: [ReactiveFormsModule, NgClass, ShowValidationMessage],
  selector: 'app-register-patient',
  styleUrl: './register-patient.css',
  templateUrl: './register-patient.html',
})
export class RegisterPatient implements OnChanges {
  @Input() showBanner:boolean=true
  @Output() patientRegistered:EventEmitter<void> = new EventEmitter<void>()
  patientForm!:FormGroup;
  @Input() patientId:number=0
  genderList=GlobalConstant.GENDER_LIST
  destroyRef=inject(DestroyRef)
  constructor(private patientSrv:PatientService){
    this.initializeForm()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['patientId'] && changes['patientId'].currentValue!==0){
      this.onEdit(changes['patientId'].currentValue)
    }
  }
  initializeForm(){
    this.patientForm=new FormGroup({
      fullName: new FormControl("",[Validators.required,Validators.minLength(3)]),
      gender: new FormControl("",[Validators.required]),
      dateOfBirth: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      address: new FormControl("",Validators.required)
    })
  }
  onEdit(id:number){
    this.patientSrv.getPatientById(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:(res:IPatientResponse)=>{
        const patientObj = {
          fullName: res.fullName,
          gender: res.gender,
          dateOfBirth: new Date(res.dateOfBirth).toISOString().split("T")[0],
          phone: res.phone,
          address: res.address
        }
        this.patientForm.setValue(patientObj)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  onResetForm(){
    this.patientForm.reset()
    this.patientId=0
  }
  onSaveForm(){
    const formValue:IPatientModel=this.patientForm.value
    this.patientSrv.registerPatient(formValue).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
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
    this.patientSrv.updatePatient(formValue,this.patientId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
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
  getControl(control:string){
    return this.patientForm.get(control)
  }
}
