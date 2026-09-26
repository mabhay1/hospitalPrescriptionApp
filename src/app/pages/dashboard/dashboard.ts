import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IDashboardModel } from '../../core/models/interfaces/Dashboard.model';
import { GetInitialsPipe } from '../../shared/pipes/get-initials-pipe';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [GetInitialsPipe,DatePipe,FormsModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  dashboardSrv = inject(DashboardService)
  dashboardData = signal<IDashboardModel>({
                          fromDate: '',
                          toDate: '',
                          totalPatients: 0,
                          totalMedicines: 0,
                          totalStaff: 0,
                          totalDoctors: 0,
                          totalVisits: 0,
                          currentVisits: 0,
                          followUpVisits: 0,
                          closedVisits: 0,
                          totalPrescriptionItems: 0,
                          topMedicines: [],
                          recentVisits: []
                        }
  )
  fromDate:string=""
  toDate:string=""

  ngOnInit(): void {
    this.getDashboardData()
  }
  getDashboardData() {
    this.dashboardSrv.getDashboardData(this.fromDate,this.toDate).subscribe({
      next: (res: any) => {
        this.dashboardData.set(res)
      },
      error: (err: HttpErrorResponse) => {
        alert("API Error")
      }
    })
  }
  applyFilter(){
    this.getDashboardData()
  }

}
