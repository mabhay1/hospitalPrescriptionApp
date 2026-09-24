import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
})
export class GetInitialsPipe implements PipeTransform {
  transform(value: string): string|null {
    if(value){
      const stringList=value.split(" ")
      const initialsList=stringList.map(x=>x.charAt(0))
      const initialsString=initialsList.join("").toUpperCase()
      return initialsString
    }
    return null;
  }
}
