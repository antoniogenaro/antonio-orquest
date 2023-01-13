import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ClockInOut,
  Employee,
  EmployeesScheduleFilter,
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

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return of(employees);
  }

  getEmployeeClockInOuts(
    filter: EmployeesScheduleFilter
  ): Observable<ClockInOut[]> {
    return this.http.get<ClockInOut[]>(this.clockInOutsEndpoint, {
      params: {
        employeeId: filter.employeeId ?? '',
        startDate: this.getDateString(filter.startDate),
        endDate: this.getDateString(filter.endDate),
      },
    });
  }

  private getDateString(date?: Date): string {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }
}
