import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "./../model/employee.model";

@Component({
  selector: "app-display-employee",
  templateUrl: "./display-employee.component.html",
  styleUrls: ["./display-employee.component.css"]
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.notify.emit(this.employee.name);
  }
}
