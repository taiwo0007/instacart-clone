import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNowCardComponent } from './shop-now-card.component';

describe('ShopNowCardComponent', () => {
  let component: ShopNowCardComponent;
  let fixture: ComponentFixture<ShopNowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopNowCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
