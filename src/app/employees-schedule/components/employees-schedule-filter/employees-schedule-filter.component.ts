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
import { EmployeesScheduleUtilsService } from '../../services/employees-schedule-utils.service';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private employeesScheduleUtils: EmployeesScheduleUtilsService
  ) {}

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }

  /**
   * Set the startDate and endDate to the last week
   */
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

  /**
   * Set the startDate and endDate to the next week
   */
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

  /**
   * Get the filter form
   */
  private generateEmployeesScheduleFilterForm(): FormGroup<EmployeesScheduleFilterForm> {
    const startDate = this.employeesScheduleUtils.getFirstDayOfWeek(new Date());
    const endDate = this.employeesScheduleUtils.getLastDayOfWeek(new Date());
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

  /**
   * Get the text to display the start and end date of the week
   */
  private getWeekDatesText(startDate?: Date, endDate?: Date): string {
    if (startDate && endDate) {
      return `${this.getDateText(startDate)} - ${this.getDateText(endDate)}`;
    }
    return '';
  }

  /**
   * Get the text to display the date
   */
  private getDateText(date: Date): string {
    return formatInTimeZone(date, environment.timezone, 'dd/MM/yyyy');
  }
}
