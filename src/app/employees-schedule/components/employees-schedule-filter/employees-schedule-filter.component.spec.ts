import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from '../../employees-schedule.module';

import { EmployeesScheduleFilterComponent } from './employees-schedule-filter.component';

describe('EmployeesScheduleFilterComponent', () => {
  let component: EmployeesScheduleFilterComponent;
  let fixture: ComponentFixture<EmployeesScheduleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesScheduleFilterComponent],
      imports: [MaterialModules, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesScheduleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
