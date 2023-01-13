import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesScheduleTableComponent } from './employees-schedule-table.component';

describe('EmployeesScheduleTableComponent', () => {
  let component: EmployeesScheduleTableComponent;
  let fixture: ComponentFixture<EmployeesScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesScheduleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
