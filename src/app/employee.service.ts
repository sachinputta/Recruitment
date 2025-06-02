import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Employee } from './Modals/employee';
import { Observable } from 'rxjs';
import { Job } from './Modals/job';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  // private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://taxapp1-9e3fb338382d.herokuapp.com';



  constructor(private http: HttpClient, private authService: AuthService) { }


  addEmployee(employeeData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/addEmployee`, employeeData, { headers });
  }


  getAllJobs(): Observable<Job[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Job[]>(`${this.baseUrl}/view-all-jobs`);
  }


  
  submitJob(job: Job): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/post-job`, job);
  }


}
