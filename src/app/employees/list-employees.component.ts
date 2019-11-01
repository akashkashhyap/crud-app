import { Component, OnInit } from "@angular/core";
import { Employee } from "./../model/employee.model";
import { EmployeeService } from "./employee.service";
import { Router } from "@angular/router";

import { StoreService } from '../services/store.service';

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.css"]
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  public _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = this.store.searchKey = value;

    this._employeeService.getEmployees(value).subscribe((empList: any) => {
      this.employees = empList.data;
      this.store.available = empList.available;
      this.filteredEmployees = this.employees;
    });
  }

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private store: StoreService
  ) {
    this.store.searchKey = '';
  }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((empList: any) => {
      // console.log(empList);
      this.employees = empList.data;
      this.store.available = empList.available;
      this.filteredEmployees = this.employees;
    });
  }

  onDeleteNotification(id: string) {
    const i = this.filteredEmployees.findIndex(e => e._id == id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
