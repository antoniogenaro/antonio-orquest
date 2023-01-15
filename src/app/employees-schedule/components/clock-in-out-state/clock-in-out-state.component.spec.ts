import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockInOutStateComponent } from './clock-in-out-state.component';

describe('ClockInOutStateComponent', () => {
  let component: ClockInOutStateComponent;
  let fixture: ComponentFixture<ClockInOutStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockInOutStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockInOutStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
