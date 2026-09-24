import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { GlobalConstant } from '../constant/GlobalConstant';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IPatientModel, IPatientResponse } from '../models/interfaces/patient.model';

@Service()
export class PatientService {
    http=inject(HttpClient)

    getAllPatients():Observable<IPatientResponse[]>{
        return this.http.get<IPatientResponse[]>(environment.API_URL+GlobalConstant.API_METHODS.GET_ALL_PATIENTS)
    }
    registerPatient(patientObj:IPatientModel):Observable<IPatientResponse>{
        return this.http.post<IPatientResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_ALL_PATIENTS,patientObj)
    }
    getPatientById(id:number):Observable<IPatientResponse>{
        return this.http.get<IPatientResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_PATIENT_BY_ID+id)
    }
    updatePatient(patientObj:IPatientModel,id:number):Observable<IPatientResponse>{
        return this.http.put<IPatientResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_PATIENT_BY_ID+id,patientObj)
    }
    removePatient(id:number){
        return this.http.delete(environment.API_URL+GlobalConstant.API_METHODS.GET_PATIENT_BY_ID+id)
    }
}
