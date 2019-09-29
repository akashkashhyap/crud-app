import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEmployeesComponent } from "./employees/list-employees.component";
import { CreateEmployeesComponent } from "./employees/create-employees.component";

const routes: Routes = [
  { path: "list", component: ListEmployeesComponent },
  { path: "create", component: CreateEmployeesComponent },
  { path: "", redirectTo: "/list", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
