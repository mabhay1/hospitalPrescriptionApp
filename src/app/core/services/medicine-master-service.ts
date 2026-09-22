import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/GlobalConstant';
import { IMedicineModel, IMedicineResponse } from '../models/interfaces/medicine.model';
import { Observable } from 'rxjs';

@Service()
export class MedicineMasterService {
    http=inject(HttpClient)
    getAllMedicines():Observable<IMedicineResponse[]>{
        return this.http.get<IMedicineResponse[]>(environment.API_URL+GlobalConstant.API_METHODS.GET_ALL_MEDICINES)
    }
    createMedicine(medicineObj:IMedicineModel):Observable<IMedicineResponse>{
        return this.http.post<IMedicineResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_ALL_MEDICINES,medicineObj)
    }
    getMedicineById(id:number):Observable<IMedicineResponse>{
        return this.http.get<IMedicineResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_MEDICINE_BY_ID+id)
    }
    updateMedicine(id:number,medicineObj:IMedicineModel):Observable<IMedicineResponse>{
        return this.http.put<IMedicineResponse>(environment.API_URL+GlobalConstant.API_METHODS.GET_MEDICINE_BY_ID+id,medicineObj)
    }
    deleteMedicine(id:number){
        return this.http.delete(environment.API_URL+GlobalConstant.API_METHODS.GET_MEDICINE_BY_ID+id)
    }
    filterMedicine(search:string):Observable<IMedicineResponse[]>{
        return this.http.get<IMedicineResponse[]>(environment.API_URL+GlobalConstant.API_METHODS.FILTER_MEDICINE+search)
    }
}
