import { HttpInterceptorFn } from '@angular/common/http';
import { GlobalConstant } from '../constant/GlobalConstant';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loginToken = sessionStorage.getItem(GlobalConstant.LOGIN_TOKEN_SESSION_KEY)
  if(loginToken!==null){
    const userToken:string = loginToken
    const newReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${userToken}`
      }
    })
    return next(newReq)
  }
  return next(req);
};
