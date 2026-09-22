import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/GlobalConstant';
import { LoginModel } from '../models/classes/User.model';
import { ILoginResponse, IUserModel, IUserResponse } from '../models/interfaces/User.model';
import { Observable } from 'rxjs';

@Service()
export class UserService {
    http = inject(HttpClient);
    loggedUserData!:IUserResponse
    constructor(){
        this.addLoginData()
    }
    addLoginData(){
        const loggedData=sessionStorage.getItem(GlobalConstant.LOGIN_USER_SESSION_KEY)
        if(loggedData!==null){
            this.loggedUserData=JSON.parse(loggedData)
        }
    }

    onLogin(loginObj:LoginModel):Observable<ILoginResponse>{
        return this.http.post<ILoginResponse>(environment.API_URL+GlobalConstant.API_METHODS.LOGIN,loginObj)
    }
    getAllUsers():Observable<IUserResponse[]>{
        return this.http.get<IUserResponse[]>(environment.API_URL+GlobalConstant.API_METHODS.CREATE_USER)
    }
    saveUser(userObj:IUserModel):Observable<IUserResponse>{
        return this.http.post<IUserResponse>(environment.API_URL+GlobalConstant.API_METHODS.CREATE_USER,userObj)
    }
    updateUser(userObj:IUserModel,id:number):Observable<IUserResponse>{
        return this.http.put<IUserResponse>(environment.API_URL+GlobalConstant.API_METHODS.CREATE_USER+"/"+id,userObj)
    }
    deleteUser(id:number){
        return this.http.delete(environment.API_URL+GlobalConstant.API_METHODS.CREATE_USER+"/"+id)
    }
    filterUser(roleName:string):Observable<IUserResponse[]>{
        return this.http.get<IUserResponse[]>(environment.API_URL+GlobalConstant.API_METHODS.FILTER_USER+roleName)
    }
}
