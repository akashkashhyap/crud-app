import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "./../model/employee.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "./employee.service";

import { StoreService } from '../services/store.service';

@Component({
  selector: "app-display-employee",
  templateUrl: "./display-employee.component.html",
  styleUrls: ["./display-employee.component.css"]
})
export class DisplayEmployeeComponent implements OnInit {
  private selectedEmployeeId: number;

  @Input() index: any;
  
  @Input() employee: Employee;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete: false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get("id");
  }

  viewEmployee() {
    // debugger;
    this.store.eIndex = this.index;
    this._router.navigate(["/employee", this.employee.email]);
  }
  editEmployee() {
    this._router.navigate(["/edit", this.employee.id]);
  }
  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.email).subscribe();
    this.notifyDelete.emit(this.employee.id);
  }
}
  