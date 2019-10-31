import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "../../model/department.model";
import { EmployeeService } from "../employee.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Employee } from "../../model/employee.model";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild("employeeForm", { static: false })
  public createEmployeeForm: NgForm;
  @ViewChild('dropFile', { static: false }) file: any;
  panelTitle: string;
  employee: Employee = {
    id: 0,
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
      const email = parameterMap.get("email");
      this.getEmployee(email);
    });
  }

  private async getEmployee(email: string) {
      this.employee = {
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
      // this.createEmployeeForm.reset();
      this.panelTitle = "Edit Employee";
      let r = await this._employeeService.getEmployee(email).toPromise();
      this.employee = Object.assign({}, r.data);
  }
  // editEmployee(): void {
  //     delete this.employee._id;
  //     const newEmployee: Employee = Object.assign({}, this.employee);
  //     this._employeeService.updateEmployee(newEmployee).subscribe(
  //       () => {
  //         // this.createEmployeeForm.reset();
  //         // this._router.navigate(["list"]);
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     );    
  // }
  editEmployee(): void {
      delete this.employee._id;
      const newEmployee: Employee = Object.assign({}, this.employee);

      let form = new FormData();
 
      Object.keys(newEmployee).forEach(function(item){
           form.append(item,newEmployee[item]);
      });

      if(this.file.nativeElement['files'].length){
        form.append('photoPath', this.file.nativeElement['files'][0])
      }
      this._employeeService.updateEmployee(newEmployee.email, form).subscribe(
        () => {
          // this.createEmployeeForm.reset();
           this._router.navigate(["list"]);
        },
        (error: any) => {
          console.log(error);
        }
      );    
  }
}

