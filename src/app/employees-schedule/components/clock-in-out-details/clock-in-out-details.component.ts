import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeDayClockInOuts } from '../../employees-schedule.model';

@Component({
  selector: 'app-clock-in-out-details',
  templateUrl: './clock-in-out-details.component.html',
  styleUrls: ['./clock-in-out-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockInOutDetailsComponent {
  @Input() employeeDayClockInOuts?: EmployeeDayClockInOuts;
}
