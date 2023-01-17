import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { formatInTimeZone } from 'date-fns-tz';
import { environment } from 'src/environments/environment';
import { EmployeeDayClockInOuts } from '../../employees-schedule.model';
import { EmployeesScheduleUtilsService } from '../../services/employees-schedule-utils.service';

@Component({
  selector: 'app-employees-schedule-table',
  templateUrl: './employees-schedule-table.component.html',
  styleUrls: ['./employees-schedule-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesScheduleTableComponent implements OnChanges {
  @Input() employeeClockInOuts: EmployeeDayClockInOuts[] = [];

  displayedColumns = ['day', 'totalMinutes', 'details', 'state'];
  totalMinutes = 0;
  employeeClockInOutsFilled: EmployeeDayClockInOuts[] = [];

  constructor(private employeesScheduleUtils: EmployeesScheduleUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeClockInOuts'].currentValue) {
      this.totalMinutes = this.calculateTotalMinutes(
        changes['employeeClockInOuts'].currentValue
      );
      this.employeeClockInOutsFilled = this.fillMissingDates(
        changes['employeeClockInOuts'].currentValue
      );
    }
  }

  /**
   * Sum total minutes
   */
  private calculateTotalMinutes(
    employeeClockInOuts: EmployeeDayClockInOuts[]
  ): number {
    return employeeClockInOuts.reduce((totalMinutes, employeeClockInOut) => {
      return totalMinutes + (employeeClockInOut.totalMinutes ?? 0);
    }, 0);
  }

  /**
   * Fill missing dates with empty EmployeeDayClockInOuts
   */
  private fillMissingDates(
    employeeClockInOuts: EmployeeDayClockInOuts[]
  ): EmployeeDayClockInOuts[] {
    const missingDates = this.getMissingDates(employeeClockInOuts);
    employeeClockInOuts.push(
      ...missingDates.map((missingDate) => ({
        day: missingDate,
      }))
    );
    employeeClockInOuts.sort((a, b) => {
      return new Date(a.day).getTime() - new Date(b.day).getTime();
    });
    return employeeClockInOuts;
  }

  /**
   * Get missing dates between startDate and endDate
   */
  private getMissingDates(
    employeeClockInOuts: EmployeeDayClockInOuts[]
  ): string[] {
    const firstDate = new Date(employeeClockInOuts[0].day);
    const startDate = this.employeesScheduleUtils.getFirstDayOfWeek(firstDate);
    const endDate = this.employeesScheduleUtils.getLastDayOfWeek(firstDate);
    const missingDates: string[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const currentDateString = formatInTimeZone(
        currentDate,
        environment.timezone,
        'yyyy-MM-dd'
      );
      if (
        !employeeClockInOuts.some(
          (employeeDayClockInOuts) =>
            employeeDayClockInOuts.day === currentDateString
        )
      ) {
        missingDates.push(currentDateString);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return missingDates;
  }
}
