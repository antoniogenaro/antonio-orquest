import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateTzPipeModule } from '../shared/pipes/date-tz/date-tz.module';
import { HoursPipeModule } from '../shared/pipes/hours/hours.module';
import { ClockInOutDetailsComponent } from './components/clock-in-out-details/clock-in-out-details.component';
import { ClockInOutStateComponent } from './components/clock-in-out-state/clock-in-out-state.component';
import { EmployeesScheduleFilterComponent } from './components/employees-schedule-filter/employees-schedule-filter.component';
import { EmployeesScheduleTableComponent } from './components/employees-schedule-table/employees-schedule-table.component';
import { EmployeesScheduleRoutingModule } from './employees-schedule-routing.module';
import { EmployeesScheduleComponent } from './pages/employees-schedule/employees-schedule.component';

export const MaterialModules = [
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatTableModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    EmployeesScheduleComponent,
    EmployeesScheduleFilterComponent,
    EmployeesScheduleTableComponent,
    ClockInOutStateComponent,
    ClockInOutDetailsComponent,
  ],
  imports: [
    CommonModule,
    EmployeesScheduleRoutingModule,
    ReactiveFormsModule,
    ...MaterialModules,
    HoursPipeModule,
    DateTzPipeModule,
  ],
})
export class EmployeesScheduleModule {}
