import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  Employee,
  EmployeesScheduleFilter,
  EmployeesScheduleFilterForm,
} from '../../employees-schedule.model';

@Component({
  selector: 'app-employees-schedule-filter',
  templateUrl: './employees-schedule-filter.component.html',
  styleUrls: ['./employees-schedule-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesScheduleFilterComponent implements OnDestroy {
  @Input() employees?: Employee[] | null;
  @Output() filterChange = new EventEmitter<EmployeesScheduleFilter>();

  destroySubject$ = new Subject();
  employeesScheduleFilterForm: FormGroup<EmployeesScheduleFilterForm> =
    this.generateEmployeesScheduleFilterForm();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }

  setWeekStartEndLastWeek(): void {
    const startDate = this.employeesScheduleFilterForm.value.startDate;
    const endDate = this.employeesScheduleFilterForm.value.endDate;
    startDate?.setDate(startDate.getDate() - 7);
    endDate?.setDate(endDate.getDate() - 7);
    this.employeesScheduleFilterForm.patchValue({
      startDate,
      endDate,
    });
  }

  setWeekStartEndNextWeek(): void {
    const startDate = this.employeesScheduleFilterForm.value.startDate;
    const endDate = this.employeesScheduleFilterForm.value.endDate;
    startDate?.setDate(startDate.getDate() + 7);
    endDate?.setDate(endDate.getDate() + 7);
    this.employeesScheduleFilterForm.patchValue({
      startDate,
      endDate,
    });
  }

  private generateEmployeesScheduleFilterForm(): FormGroup<EmployeesScheduleFilterForm> {
    const [startDate, endDate] = this.getWeekStartEnd(new Date());
    const form = new FormGroup<EmployeesScheduleFilterForm>({
      employeeId: new FormControl(null),
      startDate: new FormControl<Date>(startDate, { nonNullable: true }),
      endDate: new FormControl<Date>(endDate, { nonNullable: true }),
    });
    form.valueChanges
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((value) => {
        console.log('asdf');
        this.filterChange.emit(value);
        this.cdr.markForCheck();
      });
    return form;
  }

  private getWeekStartEnd(date: Date): Date[] {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date.setDate(diff));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return [startDate, endDate];
  }
}
