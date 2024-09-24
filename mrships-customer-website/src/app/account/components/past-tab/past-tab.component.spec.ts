import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTabComponent } from './past-tab.component';

describe('PastTabComponent', () => {
  let component: PastTabComponent;
  let fixture: ComponentFixture<PastTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
