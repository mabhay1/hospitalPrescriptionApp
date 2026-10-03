import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { Role } from '../../core/enum/Role.enum';

@Directive({
  selector: '[appHideForReceptionist]',
})
export class HideForReceptionist implements OnInit {
  elementRef=inject(ElementRef)
  userSrv=inject(UserService)
  userRole=this.userSrv.loggedUserData.roleName as Role
  ngOnInit(): void {
    if(this.userRole===Role.RECEPTIONIST){
      this.elementRef.nativeElement.style.display="none"
    }
  }
}
