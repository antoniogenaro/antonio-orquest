import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeesScheduleFilterComponent } from './components/employees-schedule-filter/employees-schedule-filter.component';
import { EmployeesScheduleTableComponent } from './components/employees-schedule-table/employees-schedule-table.component';
import { EmployeesScheduleRoutingModule } from './employees-schedule-routing.module';
import { EmployeesScheduleComponent } from './pages/employees-schedule/employees-schedule.component';

const MaterialModules = [
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    EmployeesScheduleComponent,
    EmployeesScheduleFilterComponent,
    EmployeesScheduleTableComponent,
  ],
  imports: [
    CommonModule,
    EmployeesScheduleRoutingModule,
    ReactiveFormsModule,
    ...MaterialModules,
  ],
})
export class EmployeesScheduleModule {}
