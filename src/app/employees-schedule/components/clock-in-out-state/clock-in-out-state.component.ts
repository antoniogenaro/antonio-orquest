import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ClockInOutState } from '../../employees-schedule.model';

@Component({
  selector: 'app-clock-in-out-state',
  templateUrl: './clock-in-out-state.component.html',
  styleUrls: ['./clock-in-out-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockInOutStateComponent {
  @Input() state?: ClockInOutState;
}
