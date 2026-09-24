import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IUserResponse } from '../../core/models/interfaces/User.model';
import { UserService } from '../../core/services/user-service';
import { GetInitialsPipe } from '../../shared/pipes/get-initials-pipe';

@Component({
  imports: [RouterOutlet,NgClass, RouterLink, RouterLinkActive,GetInitialsPipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  
  isSideBarCollapsed:boolean = false;
  loggedUserData!:IUserResponse;
  userSrv = inject(UserService)

  constructor(private router:Router){
    this.loggedUserData=this.userSrv.loggedUserData
  }
  toggleSidebar(){
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
  onLogout(){
    sessionStorage.removeItem('hospitalUser')
    sessionStorage.removeItem('hospitalUserToken')
    this.router.navigate(['/login'])
  }
}
