import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodPlaceholderComponent } from './payment-method-placeholder.component';

describe('PaymentMethodPlaceholderComponent', () => {
  let component: PaymentMethodPlaceholderComponent;
  let fixture: ComponentFixture<PaymentMethodPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
