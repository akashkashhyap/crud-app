import { Injectable } from "@angular/core";
import { Employee } from "./../model/employee.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import { map } from "rxjs/operators";

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: "Mark",
      gender: "Male",
      contactPreference: "Email",
      email: "mark@pragimtech.com",
      dateOfBirth: new Date("10/25/1988"),
      department: "IT",
      isActive: true,
      photoPath: "assets/images/mark.png"
    },
    {
      id: 2,
      name: "Mary",
      gender: "Female",
      contactPreference: "Phone",
      phoneNumber: 2345978640,
      dateOfBirth: new Date("11/20/1979"),
      department: "HR",
      isActive: true,
      photoPath: "assets/images/mary.png"
    },
    {
      id: 3,
      name: "John",
      gender: "Male",
      contactPreference: "Phone",
      phoneNumber: 5432978640,
      dateOfBirth: new Date("3/25/1976"),
      department: "IT",
      isActive: false,
      photoPath: "assets/images/john.png"
    }
  ];

  // baseUrl = "http://localhost:3000/employees";
  baseUrl = 'https://nodeapis101.herokuapp.com/api/v1';
  
  
  getEmployees(value?: String): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/crudapp/users${value ? '?search=' + value : ''}`);
  }
  getEmployee(_id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/crudapp/user/${_id}`);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/crudapp/user`, employee, {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      })
    });
  }

  updateEmployee(employee: Employee): Observable<void> {
      return this.httpClient.put<void>(
        `${this.baseUrl}/${employee.id}`,
        employee,
        {
          headers: new HttpHeaders({
            "Content-type": "application/json"
          })
        }
      );
   
  }
  deleteEmployee(_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/crudapp/user/${_id}`);
  }
  
  nextEmployee(value?: string, skip?: number, limit: number = 1) {
    return this.httpClient.get<any>(`${this.baseUrl}/crudapp/users?search=${value}&skip=${skip + 1}&limit=${limit}`);
  }
  prevEmployee(value?: string, skip?: number, limit: number = 1) {
    return this.httpClient.get<any>(`${this.baseUrl}/crudapp/users?search=${value}&skip=${skip - 1}&limit=${limit}`);
  }
}
