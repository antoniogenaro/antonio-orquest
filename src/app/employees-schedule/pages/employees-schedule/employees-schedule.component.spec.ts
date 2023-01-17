import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesScheduleFilterComponent } from '../../components/employees-schedule-filter/employees-schedule-filter.component';
import { MaterialModules } from '../../employees-schedule.module';

import { EmployeesScheduleComponent } from './employees-schedule.component';

describe('EmployeesScheduleComponent', () => {
  let component: EmployeesScheduleComponent;
  let fixture: ComponentFixture<EmployeesScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EmployeesScheduleComponent,
        EmployeesScheduleFilterComponent,
      ],
      imports: [
        HttpClientModule,
        MaterialModules,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
