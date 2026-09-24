import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/GlobalConstant';
import { Observable } from 'rxjs';
import { IVisitListModel } from '../models/interfaces/IVisit.model';
import { VisitModel } from '../models/classes/Visit.model';

@Service()
export class VisitService {
    http=inject(HttpClient)
    visitUrl=environment.API_URL+GlobalConstant.API_METHODS.GET_ALL_VISITS
    getAllVisits():Observable<IVisitListModel[]>{
        return this.http.get<IVisitListModel[]>(this.visitUrl)
    }
    createVisit(obj:VisitModel):Observable<IVisitListModel>{
        return this.http.post<IVisitListModel>(this.visitUrl,obj)
    }
    updateVisit(obj:VisitModel,id:number):Observable<IVisitListModel>{
        return this.http.put<IVisitListModel>(`${this.visitUrl}/${id}`,obj)
    }
    deleteVisit(id:number){
        return this.http.delete(`${this.visitUrl}/${id}`)
    }
    getVisitsByPatientId(patientId:number):Observable<IVisitListModel[]>{
        return this.http.get<IVisitListModel[]>(environment.API_URL+GlobalConstant.API_METHODS.GET_VISITS_BY_PATIENT_ID+patientId)
    }
}
