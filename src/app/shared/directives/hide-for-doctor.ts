import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { Role } from '../../core/enum/Role.enum';

@Directive({
  selector: '[appHideForDoctor]',
})
export class HideForDoctor implements OnInit {

  userSrv=inject(UserService)
  sessionData=this.userSrv.loggedUserData
  userRole=this.sessionData.roleName as Role
  constructor(private elementRef:ElementRef){
    
  }
  ngOnInit(): void {
    if(this.userRole===Role.DOCTOR){
      this.elementRef.nativeElement.style.display="none"
    }
  }
}
