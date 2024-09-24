import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPriceSummaryComponent } from './checkout-price-summary.component';

describe('CheckoutPriceSummaryComponent', () => {
  let component: CheckoutPriceSummaryComponent;
  let fixture: ComponentFixture<CheckoutPriceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPriceSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPriceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
