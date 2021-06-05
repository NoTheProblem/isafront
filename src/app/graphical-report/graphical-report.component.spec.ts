import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalReportComponent } from './graphical-report.component';

describe('GraphicalReportComponent', () => {
  let component: GraphicalReportComponent;
  let fixture: ComponentFixture<GraphicalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
