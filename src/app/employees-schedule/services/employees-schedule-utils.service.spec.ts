import { TestBed } from '@angular/core/testing';

import { EmployeesScheduleUtilsService } from './employees-schedule-utils.service';

describe('EmployeesScheduleUtilsService', () => {
  let service: EmployeesScheduleUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesScheduleUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDateString', () => {
    it('should return 2022-01-01', () => {
      expect(service.getDateString(new Date(2022, 0, 1))).toBe('2022-01-01');
    });
    it('sends undefined and should return empty string', () => {
      expect(service.getDateString(undefined)).toBe('');
    });
  });

  describe('sumClockInOutMinutes', () => {
    it('should return 45', () => {
      expect(
        service.sumClockInOutMinutes({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: new Date(2022, 0, 1, 0, 45, 0),
        })
      ).toBe(45);
    });
    it('sends without rest and should return 60', () => {
      expect(
        service.sumClockInOutMinutes({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
        })
      ).toBe(60);
    });
    it('sends clockOut undefined and should return 0', () => {
      expect(
        service.sumClockInOutMinutes({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: undefined,
        })
      ).toBe(0);
    });
    it('sends restOut undefined and should return 0', () => {
      expect(
        service.sumClockInOutMinutes({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: undefined,
        })
      ).toBe(0);
    });
  });

  describe('getMinutesBetween', () => {
    it('should return 60', () => {
      expect(
        service.getMinutesBetween(
          new Date(2022, 0, 1, 0, 0, 0),
          new Date(2022, 0, 1, 1, 0, 0)
        )
      ).toBe(60);
    });
    it('should return 210', () => {
      expect(
        service.getMinutesBetween(
          new Date(2022, 0, 1, 1, 0, 0),
          new Date(2022, 0, 1, 4, 30, 0)
        )
      ).toBe(210);
    });
    it('sends the same date and should return 0', () => {
      expect(
        service.getMinutesBetween(new Date(2022, 0, 1), new Date(2022, 0, 1))
      ).toBe(0);
    });
    it('sends the first date undefined and should return 0', () => {
      expect(service.getMinutesBetween(undefined, new Date(2022, 0, 1))).toBe(
        0
      );
    });
    it('sends the second date undefined and should return 0', () => {
      expect(service.getMinutesBetween(new Date(2022, 0, 1), undefined)).toBe(
        0
      );
    });
    it('sends two undefined dates and should return 0', () => {
      expect(service.getMinutesBetween(undefined, undefined)).toBe(0);
    });
  });

  describe('getClockInOutState', () => {
    it('sends all the props and should return COMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: new Date(2022, 0, 1, 0, 45, 0),
        })
      ).toBe('COMPLETED');
    });
    it('sends restIn and restOut undefined and should return COMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: undefined,
          restOut: undefined,
        })
      ).toBe('COMPLETED');
    });
    it('sends restOut undefined and should return INCOMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: undefined,
        })
      ).toBe('INCOMPLETED');
    });
    it('sends restIn undefined and should return INCOMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: undefined,
          restOut: new Date(2022, 0, 1, 0, 45, 0),
        })
      ).toBe('INCOMPLETED');
    });
    it('sends clockOut undefined and should return INCOMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: new Date(2022, 0, 1, 0, 0, 0),
          clockOut: undefined,
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: new Date(2022, 0, 1, 0, 45, 0),
        })
      ).toBe('INCOMPLETED');
    });
    it('sends clockIn undefined and should return INCOMPLETED', () => {
      expect(
        service.getClockInOutState({
          clockIn: undefined,
          clockOut: new Date(2022, 0, 1, 1, 0, 0),
          restIn: new Date(2022, 0, 1, 0, 30, 0),
          restOut: new Date(2022, 0, 1, 0, 45, 0),
        })
      ).toBe('INCOMPLETED');
    });
  });

  describe('isOneDateNull', () => {
    it('sends the second date undefined and should return true', () => {
      expect(service.isOneDateNull(new Date(), undefined)).toBe(true);
    });
    it('sends the first date undefined and should return true', () => {
      expect(service.isOneDateNull(undefined, new Date())).toBe(true);
    });
    it('sends all the dates undefined and should return false', () => {
      expect(service.isOneDateNull(undefined, undefined)).toBe(false);
    });
    it('sends all the dates and should return false', () => {
      expect(service.isOneDateNull(new Date(), new Date())).toBe(false);
    });
  });

  describe('getFirstDayOfWeek', () => {
    it('should return 2022-12-26', () => {
      expect(service.getFirstDayOfWeek(new Date(2022, 11, 31))).toEqual(
        new Date(2022, 11, 26)
      );
    });
  });

  describe('getLastDayOfWeek', () => {
    it('should return 2023-01-01', () => {
      expect(service.getLastDayOfWeek(new Date(2022, 11, 31))).toEqual(
        new Date(2023, 0, 1)
      );
    });
  });
});
