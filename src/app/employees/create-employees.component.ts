import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "./../model/department.model";
import { EmployeeService } from "./employee.service";
import { Router } from "@angular/router";
import { Employee } from "./../model/employee.model";

@Component({
  selector: "app-create-employees",
  templateUrl: "./create-employees.component.html",
  styleUrls: ["./create-employees.component.css"]
})
export class CreateEmployeesComponent implements OnInit {
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: "",
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: "select",
    isActive: null,
    photoPath: null
  };
  departments: Department[] = [
    { id: 1, name: "Help Desk" },
    { id: 2, name: "HR" },
    { id: 3, name: "IT" },
    { id: 4, name: "Payroll" }
  ];
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit() {}

  saveEmployee(): void {
    this._employeeService.save(this.employee);
    this._router.navigate(["list"]);
  }
}
