import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchProductComponent } from './branch-product.component';

describe('BranchProductComponent', () => {
  let component: BranchProductComponent;
  let fixture: ComponentFixture<BranchProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchProductComponent]
    });
    fixture = TestBed.createComponent(BranchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
