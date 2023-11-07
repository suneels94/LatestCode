import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }
  // create User Starts Here
  public createUser(user: any){
    return this.http.post(`${baseUrl}/api/`, user);
  }
    // create User Ends Here

    // Get user Starts Here
    public getUser() : Observable<any>{
      return this.http.get(`${baseUrl}/api/employeesList`);
    } 
    // Get user Ends Here

    //Create Employee Starts Here
    createEmployee(employee: any): Observable<any>{
      return this.http.post(`${baseUrl}/api/createEmployee`, employee)
    }
    //Create Employee Ends Here

    //Update Employee starts Here
    updateEmployee(datavalue: any):Observable<any>{
      return this.http.put(`${baseUrl}/api/employee/`+datavalue, datavalue)
    }
    //Update Employee ends Here
}
