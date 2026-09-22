import { Component, ElementRef, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { form, FormField, minLength, required, schema } from '@angular/forms/signals';
import { IMedicineModel, IMedicineResponse } from '../../core/models/interfaces/medicine.model';
import { MedicineMasterService } from '../../core/services/medicine-master-service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { NgFor } from '@angular/common';

@Component({
  imports: [FormField, NgFor],
  selector: 'app-medicine-master',
  styleUrl: './medicine-master.css',
  templateUrl: './medicine-master.html',
})
export class MedicineMaster implements OnInit {
  @ViewChild('medicineModal') medicineModel!:ElementRef;
  @ViewChild('searchInput') searchInput!:ElementRef;
  medicineList:WritableSignal<IMedicineResponse[]>=signal<IMedicineResponse[]>([])
  medicineObj:WritableSignal<IMedicineModel> = signal<IMedicineModel>({
    name: "",
    strength: "",
    form: ""
  })
  medicineForm=form(this.medicineObj,(schema)=>{
    required(schema.name,{message:'Name is required'})
    required(schema.strength,{message:'Strength is required'})
    required(schema.form,{message:'Form is required'})
    minLength(schema.name,4,{message:'min 4 characters are required'})
  })
  currentMedicineid:number=0
  medicineFormList=GlobalConstant.MEDICINE_FORM_LIST
  constructor(private medicineSrv:MedicineMasterService){

  }

  ngOnInit(): void {
    this.getAllMedicines()
  }
  onSearchMedicine() {
    if (this.searchInput) {
      const searchValue = this.searchInput.nativeElement.value
      if (searchValue !== '') {
        this.medicineSrv.filterMedicine(searchValue).subscribe({
          next: (res: IMedicineResponse[]) => {
            this.medicineList.set(res)
          },
          error: (err: HttpErrorResponse) => {
            alert("API Error")
          }
        })
      }
      else {
        this.getAllMedicines()
      }
    }
  }
  onResetSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value=""
      this.getAllMedicines()
    }
  }
  
  openCloseMedicineModel(showModel:boolean){
    if(showModel){
      this.medicineModel.nativeElement.style.display='block'
    }
    else{
      this.medicineModel.nativeElement.style.display='none'
    }
  }
  getAllMedicines(){
    this.medicineSrv.getAllMedicines().subscribe({
      next:(res:IMedicineResponse[])=>{
        this.medicineList.set(res)
      }
    })
  }
  onEditMedicine(id:number){
    this.currentMedicineid=id
    this.medicineSrv.getMedicineById(id).subscribe({
      next:(res:IMedicineResponse)=>{
        this.medicineObj.set(res)
        this.openCloseMedicineModel(true)
      }
    })
  }
  onDeleteMedicine(id:number){
    const isDelete=confirm("Are you sure you want to delete!!")
    if(isDelete){
      this.medicineSrv.deleteMedicine(id).subscribe({
        next:(res)=>{
          alert("Medicine Deleted Successfully")
          this.getAllMedicines()
        }
      })
    }
  }
  onResetForm() {
    // this.medicineObj.set({
    //   name: "",
    //   strength: "",
    //   form: ""
    // })
    this.medicineForm().reset({
      name: "",
      strength: "",
      form: ""
    })
    this.currentMedicineid=0
  }
  onSaveMedicine(){
    const formValue= this.medicineForm().value()
    this.medicineSrv.createMedicine(formValue).subscribe({
      next:(res:IMedicineResponse)=>{
        alert("Medicine updated")
        this.onResetForm()
        this.getAllMedicines()
        this.openCloseMedicineModel(false)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
  onUpdateMedicine(){
    const formValue:IMedicineModel=this.medicineForm().value()
    this.medicineSrv.updateMedicine(this.currentMedicineid,formValue).subscribe({
      next:(res:IMedicineResponse)=>{
        alert("Medicine updated successfully")
        this.onResetForm()
        this.getAllMedicines()
        this.openCloseMedicineModel(false)
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }

}
