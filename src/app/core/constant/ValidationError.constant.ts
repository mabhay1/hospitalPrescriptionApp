import { minLength, PATTERN } from "@angular/forms/signals";

export const ValidationError={
    REQUIRED:(field:string)=>`${field} is required`,
    PATTERN:(field:string)=>`${field} is not valid`,
    MINLENGTH:(minCharacter:number)=>`Minimum ${minCharacter} character required`
}