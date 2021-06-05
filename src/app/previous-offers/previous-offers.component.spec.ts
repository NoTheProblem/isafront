import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOffersComponent } from './previous-offers.component';

describe('PreviousOffersComponent', () => {
  let component: PreviousOffersComponent;
  let fixture: ComponentFixture<PreviousOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
