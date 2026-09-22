import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RegisterPatient } from '../register-patient/register-patient';
import { IPatientResponse } from '../../../core/models/interfaces/patient.model';
import { PatientService } from '../../../core/services/patient-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [NgClass,RegisterPatient,DatePipe],
  selector: 'app-patient-list',
  styleUrl: './patient-list.css',
  templateUrl: './patient-list.html',
})
export class PatientList implements OnInit {
  isPatientFormVisible:boolean=true
  patientList:WritableSignal<IPatientResponse[]>=signal<IPatientResponse[]>([])
  patientSrv=inject(PatientService)

  ngOnInit(): void {
    this.getAllPatients()
  }

  openClosePatientForm(formVisible:boolean){
    this.isPatientFormVisible=formVisible
  }
  getAllPatients(){
    this.patientSrv.getAllPatients().subscribe({
      next:(res:IPatientResponse[])=>{
        this.patientList.set(res)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }

}
