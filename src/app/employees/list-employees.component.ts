import { Component, OnInit } from "@angular/core";
import { Employee } from "./../model/employee.model";
import { EmployeeService } from "./employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.css"]
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees:Employee[];
  private _searchTerm:string;

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value:string){
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  filterEmployees(searchString: string){
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  
}
