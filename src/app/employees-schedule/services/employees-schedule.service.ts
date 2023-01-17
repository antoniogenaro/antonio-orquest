import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatInTimeZone } from 'date-fns-tz';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ClockInOut,
  DayOfWeek,
  Employee,
  EmployeeDayClockInOuts,
  EmployeesScheduleFilter,
  WeekDailyRestrictions,
} from '../employees-schedule.model';
import { EmployeesScheduleUtilsService } from './employees-schedule-utils.service';

const employees: Employee[] = [
  { employeeId: 111111111, name: '111111111' },
  { employeeId: 222222222, name: '222222222' },
  { employeeId: 333333333, name: '333333333' },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeesScheduleService {
  private readonly clockInOutsEndpoint = `${environment.apiEndpoint}/clock-in-outs`;
  private readonly dailyRestrictionsEndpoint = `${environment.apiEndpoint}/daily-restrictions`;

  constructor(
    private http: HttpClient,
    private employeesScheduleUtils: EmployeesScheduleUtilsService
  ) {}

  /**
   * Returns an observable with the employees
   */
  getEmployees(): Observable<Employee[]> {
    return of(employees);
  }

  /**
   * Returns an observable with the employee clockInOuts in the given date range
   */
  getEmployeeClockInOuts(
    filter: EmployeesScheduleFilter,
    dailyRestrictions: WeekDailyRestrictions
  ): Observable<EmployeeDayClockInOuts[]> {
    return this.http
      .get<EmployeeDayClockInOuts[]>(this.clockInOutsEndpoint, {
        params: {
          employeeId: filter.employeeId ?? '',
          startDate: this.employeesScheduleUtils.getDateString(
            filter.startDate
          ),
          endDate: this.employeesScheduleUtils.getDateString(filter.endDate),
        },
      })
      .pipe(
        map((employeeClockInOuts) =>
          employeeClockInOuts.map((employeeDayClockInOuts) =>
            this.mapEmployeeDayClockInOuts(
              employeeDayClockInOuts,
              dailyRestrictions
            )
          )
        )
      );
  }

  /**
   * Returns an observable with the daily restrictions configuration
   */
  getDailyRestrictions(): Observable<WeekDailyRestrictions> {
    return this.http.get<WeekDailyRestrictions>(this.dailyRestrictionsEndpoint);
  }

  /**
   * Map employeeDayClockInOuts object
   */
  private mapEmployeeDayClockInOuts(
    employeeDayClockInOuts: EmployeeDayClockInOuts,
    dailyRestrictions: WeekDailyRestrictions
  ): EmployeeDayClockInOuts {
    let totalMinutes = 0;
    employeeDayClockInOuts.state = 'COMPLETED';
    employeeDayClockInOuts.clockInOuts?.map((clockInOut) => {
      clockInOut = this.mapClockInOut(
        clockInOut,
        dailyRestrictions,
        employeeDayClockInOuts.dayOfWeek
      );
      // Sum clockInOuts minutes
      totalMinutes += clockInOut.totalMinutes ?? 0;
      // Set employeeDayClockInOuts state to INCOMPLETED if the current clockInOut is INCOMPLETED
      if (clockInOut.state === 'INCOMPLETED') {
        employeeDayClockInOuts.state = 'INCOMPLETED';
      }
      // Set employeeDayClockInOuts restrictionsErrors if the current clockInOut has restrictionsErrors
      if (clockInOut.restrictionsErrors?.minHourMinuteClockIn) {
        employeeDayClockInOuts.restrictionsErrors = {
          ...employeeDayClockInOuts.restrictionsErrors,
          minHourMinuteClockIn:
            clockInOut.restrictionsErrors?.minHourMinuteClockIn,
        };
      }
    });
    // Set employeeDayClockInOuts totalMinutes
    employeeDayClockInOuts.totalMinutes = totalMinutes;
    const dayOfWeek = employeeDayClockInOuts.dayOfWeek;
    if (dayOfWeek) {
      // Set employeeDayClockInOuts restrictionsErrors if the totalMinutes is greater than the maxMinutesAllowedToWork
      const maxMinutesAllowedToWork =
        dailyRestrictions[dayOfWeek].maxMinutesAllowedToWork ?? 0;
      if (totalMinutes > maxMinutesAllowedToWork) {
        employeeDayClockInOuts.restrictionsErrors = {
          ...employeeDayClockInOuts.restrictionsErrors,
          maxMinutesAllowedToWork: maxMinutesAllowedToWork,
        };
      }
    }
    return employeeDayClockInOuts;
  }

  /**
   * Map clockInOut object
   */
  private mapClockInOut(
    clockInOut: ClockInOut,
    dailyRestrictions: WeekDailyRestrictions,
    dayOfWeek?: DayOfWeek
  ): ClockInOut {
    clockInOut.state =
      this.employeesScheduleUtils.getClockInOutState(clockInOut);
    // Set clockInOut totalMinutes if the clockInOut is completed
    if (clockInOut.state === 'COMPLETED') {
      clockInOut.totalMinutes =
        this.employeesScheduleUtils.sumClockInOutMinutes(clockInOut);
    }
    if (dayOfWeek) {
      // Set clockInOut restrictionsErrors if the clockIn is before the min hour and minute
      const minHourClockIn = dailyRestrictions[dayOfWeek].minHourClockIn;
      const minMinuteClockIn = dailyRestrictions[dayOfWeek].minMinuteClockIn;
      if (
        typeof minHourClockIn === 'number' &&
        typeof minMinuteClockIn === 'number' &&
        clockInOut.clockIn
      ) {
        const minHourMinuteClockIn = `${String(
          dailyRestrictions[dayOfWeek].minHourClockIn
        ).padStart(2, '0')}:${String(
          dailyRestrictions[dayOfWeek].minMinuteClockIn
        ).padStart(2, '0')}`;
        const hourMinuteClockIn = formatInTimeZone(
          clockInOut.clockIn,
          environment.timezone,
          'HH:mm'
        );
        if (hourMinuteClockIn < minHourMinuteClockIn) {
          clockInOut.restrictionsErrors = {
            ...clockInOut.restrictionsErrors,
            minHourMinuteClockIn: minHourMinuteClockIn,
          };
        }
      }
    }
    return clockInOut;
  }
}
