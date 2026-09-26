import { Directive, ElementRef, inject } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { Role } from '../../core/enum/Role.enum';

@Directive({
  selector: '[appHideForDoctor]',
})
export class HideForDoctor {

  userSrv=inject(UserService)
  sessionData=this.userSrv.loggedUserData
  constructor(private elementRef:ElementRef){
    const userRole=this.sessionData.roleName as Role
    if(userRole===Role.DOCTOR){
      this.elementRef.nativeElement.style.display="none"
    }
  }
}
