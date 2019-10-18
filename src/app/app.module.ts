import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListEmployeesComponent } from "./employees/list-employees.component";
import { CreateEmployeesComponent } from "./employees/create-employees.component";
import { EmployeeService } from "./employees/employee.service";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DisplayEmployeeComponent } from "./employees/display-employee.component";
import { CreateEmployeeCanDeactivateGuardService } from "./employees/create-employee-can-deactivate.service";
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import {EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeesComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService,EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
