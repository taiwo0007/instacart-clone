import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsModalComponent } from './search-results-modal.component';

describe('SearchResultsModalComponent', () => {
  let component: SearchResultsModalComponent;
  let fixture: ComponentFixture<SearchResultsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
