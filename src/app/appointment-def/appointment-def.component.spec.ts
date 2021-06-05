import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDefComponent } from './appointment-def.component';

describe('AppointmentDefComponent', () => {
  let component: AppointmentDefComponent;
  let fixture: ComponentFixture<AppointmentDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
