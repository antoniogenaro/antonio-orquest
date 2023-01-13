import { ChangeDetectionStrategy, Component } from '@angular/core';

const datesOfWeek = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

@Component({
  selector: 'app-employees-schedule-table',
  templateUrl: './employees-schedule-table.component.html',
  styleUrls: ['./employees-schedule-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesScheduleTableComponent {}
