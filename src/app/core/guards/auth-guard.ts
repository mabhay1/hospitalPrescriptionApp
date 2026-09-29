import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/GlobalConstant';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';

export const authGuard: CanActivateFn = (route, state) => {
  const userSrv=inject(UserService)
  const sessionData=userSrv.loggedUserData
  const router = inject(Router)
  if(sessionData!==null){
    return true
  }
  else{
    router.navigate(['/login'])
    return false
  }
};
