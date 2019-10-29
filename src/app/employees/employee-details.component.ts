import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Employee } from "./../model/employee.model";

import { StoreService } from '../services/store.service';

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
  private _id: number;
  employee: Employee;

  private index: any;
  private length: any;

  public showNextBtn: boolean;
  public showPrevBtn: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router,
    private store: StoreService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(async params => {
      this.index = +params.get("index");
      this.length = +params.get("length");

      let email = params.get("id");
      let l: any = await this._employeeService.getEmployee(email).toPromise();
      this.employee = l.data;

      this.showNextBtn = this.store.available - this.store.eIndex > 1;
      this.showPrevBtn = this.store.eIndex > 0;
    });
  }

  async viewNextEmployee() {
    let r: any = await this._employeeService.nextEmployee(this.store.searchKey, this.store.eIndex).toPromise();

    if(!r) {return;}

    this.store.eIndex += 1;
    this._router.navigate(["/employee", r.data[0].email]);
  }
  async viewPrevEmployee() {
    let r: any = await this._employeeService.prevEmployee(this.store.searchKey, this.store.eIndex).toPromise();

    if(!r) {return;}

    this.store.eIndex -= 1;
    this._router.navigate(["/employee", r.data[0].email]);
  }
}
