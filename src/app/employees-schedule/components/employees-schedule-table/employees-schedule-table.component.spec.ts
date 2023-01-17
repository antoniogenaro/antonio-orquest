import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoursPipeModule } from 'src/app/shared/pipes/hours/hours.module';
import { MaterialModules } from '../../employees-schedule.module';

import { EmployeesScheduleTableComponent } from './employees-schedule-table.component';

describe('EmployeesScheduleTableComponent', () => {
  let component: EmployeesScheduleTableComponent;
  let fixture: ComponentFixture<EmployeesScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesScheduleTableComponent],
      imports: [HoursPipeModule, MaterialModules],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
