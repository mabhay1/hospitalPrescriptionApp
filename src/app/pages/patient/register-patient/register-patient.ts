import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPatientModel, IPatientResponse } from '../../../core/models/interfaces/patient.model';
import { PatientService } from '../../../core/services/patient-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register-patient',
  styleUrl: './register-patient.css',
  templateUrl: './register-patient.html',
})
export class RegisterPatient {
  @Input() showBanner:boolean=true
  patientForm!:FormGroup;
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
  onSaveForm(){
    const formValue:IPatientModel=this.patientForm.value
    this.patientSrv.registerPatient(formValue).subscribe({
      next:(res:IPatientResponse)=>{
        debugger
        alert("Patient Regsitered Success")
      },
      error:(err:HttpErrorResponse)=>{
        debugger
        alert("API Error")
      }
    })
  }
}
