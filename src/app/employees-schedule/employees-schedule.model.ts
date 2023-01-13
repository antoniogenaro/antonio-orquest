import { FormControl } from '@angular/forms';

export interface Employee {
  employeeId: number;
  name: string;
}

export interface ClockInOut {
  clockIn: Date;
  clockOut: Date;
  restIn?: Date;
  restOut?: Date;
}

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

// APIs
