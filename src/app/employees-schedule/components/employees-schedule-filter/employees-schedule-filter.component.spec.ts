import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesScheduleFilterComponent } from './employees-schedule-filter.component';

describe('EmployeesScheduleFilterComponent', () => {
  let component: EmployeesScheduleFilterComponent;
  let fixture: ComponentFixture<EmployeesScheduleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesScheduleFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesScheduleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
