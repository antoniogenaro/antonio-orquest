import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EmployeesScheduleService } from './employees-schedule.service';

describe('EmployeesScheduleService', () => {
  let service: EmployeesScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EmployeesScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
