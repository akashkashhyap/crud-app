import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "./../model/department.model";
import { EmployeeService } from "./employee.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Employee } from "./../model/employee.model";

@Component({
  selector: "app-create-employees",
  templateUrl: "./create-employees.component.html",
  styleUrls: ["./create-employees.component.css"]
})
export class CreateEmployeesComponent implements OnInit {
  @ViewChild("employeeForm", { static: false })
  public createEmployeeForm: NgForm;
  panelTitle: string;
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
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get("id");
      this.getEmployee(id);
    });
  }

  private async getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
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
      this.panelTitle = "Create Employee";
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = "Edit Employee";
      let r = await this._employeeService.getEmployee(id).toPromise();
      this.employee = Object.assign({}, r.data);
    }
  }
  saveEmployee(): void {
    // const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(this.employee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(["list"]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
