import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loginToken = sessionStorage.getItem('hospitalUserToken')
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
