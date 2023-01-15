import { FormControl } from '@angular/forms';

export interface Employee {
  employeeId: number;
  name: string;
}

export interface EmployeeDayClockInOuts {
  day: string;
  dayOfWeek?: DayOfWeek;
  clockInOuts?: ClockInOut[];
  totalMinutes?: number;
  state?: EmployeeDayClockInOutsState;
  restrictionsErrors?: EmployeeDayClockInOutsRestrictionsErrors;
}

export type EmployeeDayClockInOutsState = 'COMPLETED' | 'INCOMPLETED';

export interface EmployeeDayClockInOutsRestrictionsErrors {
  maxMinutesAllowedToWork?: number;
  minHourMinuteClockIn?: string;
}

export interface ClockInOut {
  clockIn: Date;
  clockOut: Date;
  restIn?: Date;
  restOut?: Date;
  totalMinutes?: number;
  state?: ClockInOutState;
  restrictionsErrors?: ClockInOutRestrictionsErrors;
}

export type ClockInOutState = 'COMPLETED' | 'INCOMPLETED';

export interface ClockInOutRestrictionsErrors {
  minHourMinuteClockIn?: string;
}

export type WeekDailyRestrictions = {
  [dayOfWeek in DayOfWeek]: DailyRestrictions;
};

export interface DailyRestrictions {
  maxMinutesAllowedToWork?: number;
  minHourClockIn?: number;
  minMinuteClockIn?: number;
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

// Forms

export interface EmployeesScheduleFilterForm {
  employeeId: FormControl<number | null>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
}

export type EmployeesScheduleFilter = Partial<{
  employeeId: number | null;
  startDate: Date;
  endDate: Date;
}>;
