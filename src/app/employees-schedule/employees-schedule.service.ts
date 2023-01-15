import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ClockInOut,
  ClockInOutState,
  DayOfWeek,
  Employee,
  EmployeeDayClockInOuts,
  EmployeesScheduleFilter,
  WeekDailyRestrictions,
} from './employees-schedule.model';

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

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return of(employees);
  }

  getEmployeeClockInOuts(
    filter: EmployeesScheduleFilter,
    dailyRestrictions: WeekDailyRestrictions
  ): Observable<EmployeeDayClockInOuts[]> {
    return this.http
      .get<EmployeeDayClockInOuts[]>(this.clockInOutsEndpoint, {
        params: {
          employeeId: filter.employeeId ?? '',
          startDate: this.getDateString(filter.startDate),
          endDate: this.getDateString(filter.endDate),
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

  getDailyRestrictions(): Observable<WeekDailyRestrictions> {
    return this.http.get<WeekDailyRestrictions>(this.dailyRestrictionsEndpoint);
  }

  // Map employeeDayClockInOuts object
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
      totalMinutes += clockInOut.totalMinutes ?? 0;
      if (clockInOut.state === 'INCOMPLETED') {
        employeeDayClockInOuts.state = 'INCOMPLETED';
      }
      if (clockInOut.restrictionsErrors?.minHourMinuteClockIn) {
        employeeDayClockInOuts.restrictionsErrors = {
          ...employeeDayClockInOuts.restrictionsErrors,
          minHourMinuteClockIn:
            clockInOut.restrictionsErrors?.minHourMinuteClockIn,
        };
      }
    });
    employeeDayClockInOuts.totalMinutes = totalMinutes;
    const dayOfWeek = employeeDayClockInOuts.dayOfWeek;
    if (dayOfWeek) {
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

  // Map clockInOut object
  private mapClockInOut(
    clockInOut: ClockInOut,
    dailyRestrictions: WeekDailyRestrictions,
    dayOfWeek?: DayOfWeek
  ): ClockInOut {
    clockInOut.state = this.getClockInOutState(clockInOut);
    if (clockInOut.state === 'COMPLETED') {
      clockInOut.totalMinutes = this.sumClockInOutMinutes(clockInOut);
    }
    if (dayOfWeek) {
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

  // Get date string from date
  private getDateString(date?: Date): string {
    if (date) {
      return formatInTimeZone(date, environment.timezone, 'yyyy-MM-dd');
    }
    return '';
  }

  // Sum minutes of a clockInOut between clockIn and clockOut excluding restIn and restOut
  private sumClockInOutMinutes(clockInOut: ClockInOut): number {
    const clockIn = clockInOut.clockIn;
    const clockOut = clockInOut.clockOut;
    const restIn = clockInOut.restIn;
    const restOut = clockInOut.restOut;
    const clockInOutMinutes = this.getMinutesBetween(clockIn, clockOut);
    const restMinutes = this.getMinutesBetween(restIn, restOut);
    const totalMinutes = clockInOutMinutes - restMinutes;
    return totalMinutes;
  }

  // Get minutes between two dates
  private getMinutesBetween(
    date1?: Date | string,
    date2?: Date | string
  ): number {
    if (date1 && date2) {
      return differenceInMinutes(new Date(date2), new Date(date1));
    }
    return 0;
  }

  // Get state of a clockInOut
  private getClockInOutState(clockInOut: ClockInOut): ClockInOutState {
    if (
      this.isOneDateNull(clockInOut.clockIn, clockInOut.clockOut) ||
      this.isOneDateNull(clockInOut.restIn, clockInOut.restOut)
    ) {
      return 'INCOMPLETED';
    }
    return 'COMPLETED';
  }

  // Check if one of two dates is null and the other is not
  private isOneDateNull(date1?: Date, date2?: Date): boolean {
    return !!(date1 && !date2) || !!(!date1 && date2);
  }
}
