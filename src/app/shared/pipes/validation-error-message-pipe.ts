import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationErrorMessage',
})
export class ValidationErrorMessagePipe implements PipeTransform {
  transform(errors: any, fieldName: string): string {
    if(errors?.['required']){
      return `${fieldName} is required`
    }
    else if(errors?.['pattern']){
      return `${fieldName} is not valid`
    }
    else if(errors?.['minlength']){
      return `Minimum ${errors?.['minlength'].requiredLength} is required`
    }
    return '';
  }
}
