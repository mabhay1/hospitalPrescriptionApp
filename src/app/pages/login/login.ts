import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { Router } from '@angular/router';
import { LoginModel } from '../../core/models/classes/User.model';
import { ILoginResponse } from '../../core/models/interfaces/User.model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginObj: LoginModel = new LoginModel()

  userSrv = inject(UserService)
  router = inject(Router)

  login(){
    this.userSrv.onLogin(this.loginObj).subscribe({
      next: (res:ILoginResponse)=>{
        sessionStorage.setItem(GlobalConstant.LOGIN_USER_SESSION_KEY,JSON.stringify(res.user))
        sessionStorage.setItem(GlobalConstant.LOGIN_TOKEN_SESSION_KEY,res.token)
        this.userSrv.addLoginData()
        this.router.navigateByUrl("/users")

      }, error:(err:any)=>{
        alert("API Error "+err.error)
      }
    })
  }
}
