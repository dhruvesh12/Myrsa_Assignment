import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [{
  path:'',
  component:AppComponent
},
{
  path:'addEmployee',
  component:AddEmployeeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
