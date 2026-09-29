import { Component, Input } from '@angular/core';
import { ValidationErrorMessagePipe } from '../../pipes/validation-error-message-pipe';

@Component({
  imports: [ValidationErrorMessagePipe],
  selector: 'app-show-validation-message',
  styleUrl: './show-validation-message.css',
  templateUrl: './show-validation-message.html',
})
export class ShowValidationMessage {
  @Input() touched:boolean|null|undefined = false
  @Input() dirty:boolean|null|undefined=false
  @Input() errors:any
  @Input() fieldName:string=''
  @Input() isSubmitted:boolean=false

}
