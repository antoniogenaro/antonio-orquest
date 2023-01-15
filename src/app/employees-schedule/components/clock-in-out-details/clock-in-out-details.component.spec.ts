import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockInOutDetailsComponent } from './clock-in-out-details.component';

describe('ClockInOutDetailsComponent', () => {
  let component: ClockInOutDetailsComponent;
  let fixture: ComponentFixture<ClockInOutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockInOutDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockInOutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
