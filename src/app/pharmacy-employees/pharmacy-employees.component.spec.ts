import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyEmployeesComponent } from './pharmacy-employees.component';

describe('PharmacyEmployeesComponent', () => {
  let component: PharmacyEmployeesComponent;
  let fixture: ComponentFixture<PharmacyEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
