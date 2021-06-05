import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFromsComponent } from './order-froms.component';

describe('OrderFromsComponent', () => {
  let component: OrderFromsComponent;
  let fixture: ComponentFixture<OrderFromsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFromsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
