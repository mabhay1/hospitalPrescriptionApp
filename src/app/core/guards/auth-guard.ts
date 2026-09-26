import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/GlobalConstant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionData=sessionStorage.getItem(GlobalConstant.LOGIN_USER_SESSION_KEY)
  const router = inject(Router)
  if(sessionData!==null){
    return true
  }
  else{
    router.navigate(['/login'])
    return false
  }
};
