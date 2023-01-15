import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatInTimeZone } from 'date-fns-tz';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  weekDatesText = '';
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
      employeeId: new FormControl(null, Validators.required),
      startDate: new FormControl<Date>(startDate, { nonNullable: true }),
      endDate: new FormControl<Date>(endDate, { nonNullable: true }),
    });
    this.weekDatesText = this.getWeekDatesText(startDate, endDate);
    this.cdr.markForCheck();
    form.valueChanges
      .pipe(
        takeUntil(this.destroySubject$),
        tap((value) => {
          this.weekDatesText = this.getWeekDatesText(
            value.startDate,
            value.endDate
          );
          this.cdr.markForCheck();
        }),
        filter(() => form.valid)
      )
      .subscribe((value) => {
        this.filterChange.emit(value);
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

  private getWeekDatesText(startDate?: Date, endDate?: Date): string {
    if (startDate && endDate) {
      return `${this.getDateText(startDate)} - ${this.getDateText(endDate)}`;
    }
    return '';
  }

  private getDateText(date: Date): string {
    return formatInTimeZone(date, environment.timezone, 'dd/MM/yyyy');
  }
}
