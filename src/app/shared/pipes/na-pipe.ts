import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
})
export class NaPipe implements PipeTransform {
  transform(value: unknown, defaultPlaceholder?:string): unknown {
    if(value===undefined||value===''||value===null){
      if(defaultPlaceholder===undefined){
        return 'NA'
      }
      else{
        return defaultPlaceholder
      }
    }
    else{
      return value
    }
  }
}
