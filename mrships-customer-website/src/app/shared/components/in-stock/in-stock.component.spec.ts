import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InStockComponent } from './in-stock.component';

describe('InStockComponent', () => {
  let component: InStockComponent;
  let fixture: ComponentFixture<InStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InStockComponent]
    });
    fixture = TestBed.createComponent(InStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
