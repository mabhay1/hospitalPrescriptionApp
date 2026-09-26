import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { GlobalConstant } from '../constant/GlobalConstant';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router=inject(Router)
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status===401){
        sessionStorage.removeItem(GlobalConstant.LOGIN_TOKEN_SESSION_KEY)
        sessionStorage.removeItem(GlobalConstant.LOGIN_USER_SESSION_KEY)
        router.navigateByUrl('/login')
      }
      return throwError(()=>error)
    })
  );
};
