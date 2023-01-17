import { Injectable } from '@angular/core';
import { differenceInMinutes, lastDayOfWeek, startOfWeek } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { environment } from 'src/environments/environment';
import { ClockInOut, ClockInOutState } from '../employees-schedule.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesScheduleUtilsService {
  /**
   * Get date string from date
   */
  getDateString(date?: Date): string {
    if (date) {
      return formatInTimeZone(date, environment.timezone, 'yyyy-MM-dd');
    }
    return '';
  }

  /**
   * Sum minutes of a clockInOut between clockIn and clockOut excluding restIn and restOut
   */
  sumClockInOutMinutes(clockInOut: ClockInOut): number {
    if (
      this.isOneDateNull(clockInOut.clockIn, clockInOut.clockOut) ||
      this.isOneDateNull(clockInOut.restIn, clockInOut.restOut)
    ) {
      return 0;
    }
    const clockIn = clockInOut.clockIn;
    const clockOut = clockInOut.clockOut;
    const restIn = clockInOut.restIn;
    const restOut = clockInOut.restOut;
    const clockInOutMinutes = this.getMinutesBetween(clockIn, clockOut);
    const restMinutes = this.getMinutesBetween(restIn, restOut);
    const totalMinutes = clockInOutMinutes - restMinutes;
    return totalMinutes;
  }

  /**
   * Get minutes between two dates
   */
  getMinutesBetween(date1?: Date | string, date2?: Date | string): number {
    if (date1 && date2) {
      return differenceInMinutes(new Date(date2), new Date(date1));
    }
    return 0;
  }

  /**
   * Get state of a clockInOut
   */
  getClockInOutState(clockInOut: ClockInOut): ClockInOutState {
    if (
      this.isOneDateNull(clockInOut.clockIn, clockInOut.clockOut) ||
      this.isOneDateNull(clockInOut.restIn, clockInOut.restOut)
    ) {
      return 'INCOMPLETED';
    }
    return 'COMPLETED';
  }

  /**
   * Check if one of two dates is null and the other is not
   */
  isOneDateNull(date1?: Date, date2?: Date): boolean {
    return !!(date1 && !date2) || !!(!date1 && date2);
  }

  /**
   * Get the first day of the week of a date
   */
  getFirstDayOfWeek(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: 1 });
  }

  /**
   * Get the last day of the week of a date
   */
  getLastDayOfWeek(date: Date): Date {
    return lastDayOfWeek(date, { weekStartsOn: 1 });
  }
}
