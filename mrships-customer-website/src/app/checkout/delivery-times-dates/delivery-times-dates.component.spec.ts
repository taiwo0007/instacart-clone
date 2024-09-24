import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTimesDatesComponent } from './delivery-times-dates.component';

describe('DeliveryTimesDatesComponent', () => {
  let component: DeliveryTimesDatesComponent;
  let fixture: ComponentFixture<DeliveryTimesDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTimesDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTimesDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
