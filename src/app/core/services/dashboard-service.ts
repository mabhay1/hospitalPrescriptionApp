import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/GlobalConstant';

@Service()
export class DashboardService {
    http=inject(HttpClient)
    url=environment.API_URL+GlobalConstant.API_METHODS.GET_DASHBOARD
    getDashboardData(fromDate:string,toDate:string){
        return this.http.get(`${this.url}?fromDate=${fromDate}&toDate=${toDate}`)
    }
}
