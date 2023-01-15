import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { finalize, Observable, shareReplay, switchMap } from 'rxjs';
import {
  Employee,
  EmployeeDayClockInOuts,
  EmployeesScheduleFilter,
} from '../../employees-schedule.model';
import { EmployeesScheduleService } from '../../employees-schedule.service';

@Component({
  selector: 'app-employees-schedule',
  templateUrl: './employees-schedule.component.html',
  styleUrls: ['./employees-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesScheduleComponent implements OnInit {
  employees$: Observable<Employee[]> =
    this.employeesScheduleService.getEmployees();
  employeeClockInOuts$?: Observable<EmployeeDayClockInOuts[]>;
  dailyRestrictions$ = this.employeesScheduleService
    .getDailyRestrictions()
    .pipe(shareReplay(1));
  loading = false;

  constructor(private employeesScheduleService: EmployeesScheduleService) {}

  ngOnInit(): void {
    this.employees$ = this.employeesScheduleService.getEmployees();
  }

  onFilterChange(filter: EmployeesScheduleFilter): void {
    this.loading = true;
    this.employeeClockInOuts$ = this.dailyRestrictions$.pipe(
      switchMap((dailyRestrictions) =>
        this.employeesScheduleService.getEmployeeClockInOuts(
          filter,
          dailyRestrictions
        )
      ),
      finalize(() => (this.loading = false))
    );
  }
}
