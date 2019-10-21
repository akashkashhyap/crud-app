import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEmployeesComponent } from "./employees/list-employees.component";
import { CreateEmployeesComponent } from "./employees/create-employees.component";
import { CreateEmployeeCanDeactivateGuardService } from "./employees/create-employee-can-deactivate.service";
import { EmployeeDetailsComponent } from "./employees/employee-details.component";
import { PageNotFoundComponent } from './page-not-found.component';
import {EmployeeDetailsGuardService} from './employees/employee-details-guard.service'

const routes: Routes = [
  { path: "list", component: ListEmployeesComponent },
  {
    path: "edit/:id",
    component: CreateEmployeesComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  { path: "employee/:id", component: EmployeeDetailsComponent,
    // canActivate: [EmployeeDetailsGuardService] 
  },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "notfound", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
