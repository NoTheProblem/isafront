import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalReportMedicineComponent } from './graphical-report-medicine.component';

describe('GraphicalReportMedicineComponent', () => {
  let component: GraphicalReportMedicineComponent;
  let fixture: ComponentFixture<GraphicalReportMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalReportMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalReportMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
