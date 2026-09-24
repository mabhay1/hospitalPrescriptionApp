import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
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
  @ViewChild(RegisterPatient) regPatient!:RegisterPatient

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
  onEditPatient(id:number){
    this.patientSrv.getPatientById(id).subscribe({
      next:(res:IPatientResponse)=>{
        const patientObj = {
          fullName: res.fullName,
          gender: res.gender,
          dateOfBirth: new Date(res.dateOfBirth).toISOString().split("T")[0],
          phone: res.phone,
          address: res.address
        }
        this.regPatient.patientId=res.patientId
        this.regPatient.patientForm.setValue(patientObj)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  onDeletePatient(id:number){
    const isDelete=confirm("Are you sure want to delete!!")
    if(isDelete){
      this.patientSrv.removePatient(id).subscribe({
        next:(res)=>{
          alert("Patient Deleted success")
          this.getAllPatients()
        },
        error:(err:HttpErrorResponse)=>{
          alert("API Error")
        }
      })
    }
  }
  onPatientRegister(){
    this.getAllPatients()
  }

}
