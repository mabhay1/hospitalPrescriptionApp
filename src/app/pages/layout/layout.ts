import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IUserResponse } from '../../core/models/interfaces/User.model';
import { UserService } from '../../core/services/user-service';
import { GetInitialsPipe } from '../../shared/pipes/get-initials-pipe';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { MenuConstant } from '../../core/constant/MenuConstant';
import { Role } from '../../core/enum/Role.enum';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet,NgClass, RouterLink, RouterLinkActive,GetInitialsPipe,FormsModule],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  
  isSideBarCollapsed:boolean = false;
  loggedUserData!:IUserResponse;
  userSrv = inject(UserService)
  menuList= MenuConstant.MENU_LIST
  allowedMenuList:any[]=[]
  searchValue:string=""

  constructor(private router:Router){
    this.loggedUserData=this.userSrv.loggedUserData
    const userRole=this.loggedUserData.roleName as Role
    this.allowedMenuList=this.menuList.filter(menu=>menu.allowedRoles.includes(userRole))

  }
  toggleSidebar(){
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
  onLogout(){
    sessionStorage.removeItem(GlobalConstant.LOGIN_USER_SESSION_KEY)
    sessionStorage.removeItem(GlobalConstant.LOGIN_TOKEN_SESSION_KEY)
    this.router.navigate(['/login'])
  }
  onSearch(){
    this.userSrv.searchInput$.next(this.searchValue)
  }
}
