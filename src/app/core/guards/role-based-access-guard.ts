import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { MenuConstant } from '../constant/MenuConstant';
import { Role } from '../enum/Role.enum';

export const roleBasedAccessGuard: CanActivateFn = (route, state) => {
  const userSrv = inject(UserService)
  const router = inject(Router)
  const sessionData=userSrv.loggedUserData
  const userRole=sessionData.roleName as Role
  const currentMenu=MenuConstant.MENU_LIST.find(menu=>menu.url.split("/")[0]===state.url.split("/")[1])
  if(currentMenu!==undefined){
    const isMenuAllowed=currentMenu.allowedRoles.includes(userRole)
    if(isMenuAllowed){
      return true
    }
    else{
      router.navigateByUrl("/not-access")
      return false
    }
  }
  return true;
};
