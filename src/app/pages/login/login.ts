import { Component,inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { Router } from '@angular/router';
import { LoginModel } from '../../core/models/classes/User.model';
import { ILoginResponse } from '../../core/models/interfaces/User.model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { exhaustMap, finalize, Subject, take, tap } from 'rxjs';
import { ValidationError } from '../../core/constant/ValidationError.constant';
import { ShowValidationMessage } from '../../shared/components/show-validation-message/show-validation-message';

@Component({
  imports: [FormsModule,ShowValidationMessage],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit,OnDestroy {
  loginObj: LoginModel = new LoginModel()
  userSrv = inject(UserService)
  router = inject(Router)
  showHidePassword:boolean=false
  loginSubject$:Subject<void>=new Subject<void>()
  emailRegex=GlobalConstant.EMAIL_REGEX
  validationError=ValidationError
  loader=signal<boolean>(false)
  isSubmit:boolean=false
  ngOnInit(): void {
    this.login()
  }
  login(){
    this.loginSubject$.pipe(
      tap(()=>{
        this.loader.set(true)
      }),
      exhaustMap(()=>this.userSrv.onLogin(this.loginObj).pipe(
        finalize(()=>{
          this.loader.set(false)
          this.login()
        })
      ))
    ).subscribe({
      next: (res:ILoginResponse)=>{
        sessionStorage.setItem(GlobalConstant.LOGIN_USER_SESSION_KEY,JSON.stringify(res.user))
        sessionStorage.setItem(GlobalConstant.LOGIN_TOKEN_SESSION_KEY,res.token)
        this.userSrv.addLoginData()
        this.router.navigateByUrl("/dashboard")

      }, error:(err:any)=>{
        alert("API Error "+err.error)
      }
    })
  }
  onLoginClicked(loginForm:NgForm){
    this.isSubmit=true
    if(loginForm.valid){
      this.loginSubject$.next()
    }
  }
  togglePassword(){
    this.showHidePassword=!this.showHidePassword
  }
  ngOnDestroy(): void {
    this.loginSubject$.unsubscribe()
  }
}
