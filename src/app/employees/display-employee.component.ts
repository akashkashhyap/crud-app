import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "./../model/employee.model";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-display-employee",
  templateUrl: "./display-employee.component.html",
  styleUrls: ["./display-employee.component.css"]
})
export class DisplayEmployeeComponent implements OnInit {
  private selectedEmployeeId: number;
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  constructor(private _route:ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id')
  }

  viewEmployee(){
    this._router.navigate(["/employee", this.employee.id]);
  }
  editEmployee(){
    this._router.navigate(["/edit", this.employee.id]);
  }
  // handleClick() {
  //   this.notify.emit(this.employee.name);
  // }
}
