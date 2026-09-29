import { DatePipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { RegisterPatient } from '../register-patient/register-patient';
import { IPatientResponse } from '../../../core/models/interfaces/patient.model';
import { PatientService } from '../../../core/services/patient-service';
import { HttpErrorResponse } from '@angular/common/http';
import { HideForDoctor } from '../../../shared/directives/hide-for-doctor';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [NgClass,RegisterPatient,DatePipe,HideForDoctor],
  selector: 'app-patient-list',
  styleUrl: './patient-list.css',
  templateUrl: './patient-list.html',
})
export class PatientList implements OnInit,OnDestroy {
  isPatientFormVisible:boolean=true
  patientList:WritableSignal<IPatientResponse[]>=signal<IPatientResponse[]>([])
  patientSrv=inject(PatientService)
  @ViewChild(RegisterPatient) regPatient!:RegisterPatient
  subscriptionArray:Subscription[]=[]
  destroySrv=inject(DestroyRef)

  ngOnInit(): void {
    this.getAllPatients()
  }

  openClosePatientForm(formVisible:boolean){
    this.isPatientFormVisible=formVisible
  }
  getAllPatients(){
    const subs=this.patientSrv.getAllPatients().subscribe({
      next:(res:IPatientResponse[])=>{
        this.patientList.set(res)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
    this.subscriptionArray.push(subs)
  }
  onEditPatient(id:number){
    const subs=this.patientSrv.getPatientById(id).subscribe({
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
    this.subscriptionArray.push(subs)
  }
  onDeletePatient(id:number){
    const isDelete=confirm("Are you sure want to delete!!")
    if(isDelete){
      this.patientSrv.removePatient(id).pipe(
        takeUntilDestroyed(this.destroySrv)
      ).subscribe({
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
  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subs)=>{
      subs.unsubscribe()
    })
  }
}
