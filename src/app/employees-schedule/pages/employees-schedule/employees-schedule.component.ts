import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeesScheduleFilter } from '../../employees-schedule.model';
import { EmployeesScheduleService } from '../../employees-schedule.service';

@Component({
  selector: 'app-employees-schedule',
  templateUrl: './employees-schedule.component.html',
  styleUrls: ['./employees-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesScheduleComponent implements OnInit {
  employees$ = this.employeesScheduleService.getEmployees();

  constructor(private employeesScheduleService: EmployeesScheduleService) {}

  ngOnInit(): void {
    this.employees$ = this.employeesScheduleService.getEmployees();
  }

  onFilterChange(filter: EmployeesScheduleFilter): void {
    console.log(filter);
    this.employeesScheduleService
      .getEmployeeClockInOuts(filter)
      .subscribe((value) => {
        console.log(value);
      });
  }
}
