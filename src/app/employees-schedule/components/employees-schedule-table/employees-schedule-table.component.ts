import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EmployeeDayClockInOuts } from '../../employees-schedule.model';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeClockInOuts'].currentValue) {
      this.totalMinutes = this.calculateTotalHours(
        changes['employeeClockInOuts'].currentValue
      );
    }
  }

  private calculateTotalHours(
    employeeClockInOuts: EmployeeDayClockInOuts[]
  ): number {
    return employeeClockInOuts.reduce((totalMinutes, employeeClockInOut) => {
      return totalMinutes + (employeeClockInOut.totalMinutes ?? 0);
    }, 0);
  }
}
