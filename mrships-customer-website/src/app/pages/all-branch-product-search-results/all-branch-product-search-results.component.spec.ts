import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBranchProductSearchResultsComponent } from './all-branch-product-search-results.component';

describe('AllBranchProductSearchResultsComponent', () => {
  let component: AllBranchProductSearchResultsComponent;
  let fixture: ComponentFixture<AllBranchProductSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBranchProductSearchResultsComponent]
    });
    fixture = TestBed.createComponent(AllBranchProductSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
