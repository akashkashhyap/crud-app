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

  baseUrl = "http://localhost:3000/employees";
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }
  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }
  save(employee: Employee): Observable<Employee> {
    if (employee.id == null) {
      return this.httpClient.post<Employee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      });
    } else {
      const foundIndex = this.listEmployees.findIndex(
        e => e.id === employee.id
      );
      this.listEmployees[foundIndex] = employee;
    }
  }

  updateEmployee(employee: Employee): Observable<void> {
    if (employee.id == null) {
      return this.httpClient.post<void>(
        `${this.baseUrl}/${employee.id}`,
        employee,
        {
          headers: new HttpHeaders({
            "Content-type": "application/json"
          })
        }
      );
    }
  }

  deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    }
  }
}
