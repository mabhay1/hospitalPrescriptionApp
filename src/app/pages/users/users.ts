import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { IUserModel, IUserResponse } from '../../core/models/interfaces/User.model';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalConstant } from '../../core/constant/GlobalConstant';

@Component({
  imports: [NgClass, ReactiveFormsModule],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users implements OnInit {
  userList:WritableSignal<IUserResponse[]> = signal<IUserResponse[]>([])
  isUserFormVisible:boolean = false
  userForm!:FormGroup;
  userSrv=inject(UserService)
  isNewUser:boolean=true
  EditUserId:number=0
  rolesList:string[]= GlobalConstant.ROLE_LIST
  @ViewChild('selectedRole') selectedRoleValue!:ElementRef;

  constructor(private fb:FormBuilder){
    this.intializeForm()
  }

  ngOnInit(): void {
    this.getUsers()
  }
  intializeForm() {
    this.userForm = this.fb.group({
      email: [''],
      fullName: [''],
      mobileNo: [''],
      password: [''],
      roleName: [''],
      isActive: [false],
    })
  }
  openCloseUserForm(formVisible:boolean){
    this.isUserFormVisible=formVisible
  }
  onSearchRole() {
    const searchRole = this.selectedRoleValue.nativeElement.value
    if (searchRole !== "") {
      this.userSrv.filterUser(searchRole).subscribe({
        next: (res: IUserResponse[]) => {
          this.userList.set(res)
        }
      })
    }
    else{
      this.getUsers()
    }
  }
  onResetRoleSearch(){
    this.selectedRoleValue.nativeElement.value=""
    this.getUsers()
  }
  getUsers(){
    this.userSrv.getAllUsers().subscribe({
      next:(res:IUserResponse[])=>{
       this.userList.set(res) 
      },error:(err:any)=>{
        alert("API Error "+err.error)
      }
    })
  }
  onResetUser() {
    // this.intializeForm()
    this.userForm.reset({
      email: '',
      fullName: '',
      mobileNo: '',
      password: '',
      roleName: '',
      isActive: false,
    })
    this.isNewUser = true
    this.EditUserId = 0
  }
  onSaveUser(){
    const formValue:IUserModel=this.userForm.value
    this.userSrv.saveUser(formValue).subscribe({
      next:(res:IUserResponse)=>{
        alert("User Created Successfully")
        this.openCloseUserForm(false)
        this.getUsers()
        this.onResetUser()
      },error:(err:any)=>{
        alert(err.error)
      }

    })
  }
  onEdit(user: IUserResponse) {
    this.isNewUser=false
    this.EditUserId=user.id
    this.openCloseUserForm(true)
    this.userForm.setValue({
      email: user.email,
      fullName: user.fullName,
      mobileNo: user.mobileNo,
      password: user.password,
      roleName: user.roleName,
      isActive: user.isActive
    })
  }
  onUpdateUser(){
    const formValue:IUserModel=this.userForm.value;
    this.userSrv.updateUser(formValue,this.EditUserId).subscribe({
      next:(res:IUserResponse)=>{
        alert("User updated successfully")
        this.openCloseUserForm(false)
        this.getUsers()
        this.onResetUser()
      },error:(err:any)=>{
        alert("API Error"+err.error)
      }
    })
  }
  onDeleteUser(id:number){
    const isConfirmDelete:boolean=confirm("Are you sure you want to delete User !!!");
    if(isConfirmDelete){
      this.userSrv.deleteUser(id).subscribe({
        next:(res)=>{
          alert("User updated successfully")
          this.getUsers()
        },error:(err)=>{
          alert("API Error"+err.error)
        }
      })
    }
  }
}
