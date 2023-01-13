import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesScheduleComponent } from './pages/employees-schedule/employees-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesScheduleRoutingModule {}
