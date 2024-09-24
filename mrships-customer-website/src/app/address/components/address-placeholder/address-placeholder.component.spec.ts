import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPlaceholderComponent } from './address-placeholder.component';

describe('AddressPlaceholderComponent', () => {
  let component: AddressPlaceholderComponent;
  let fixture: ComponentFixture<AddressPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressPlaceholderComponent]
    });
    fixture = TestBed.createComponent(AddressPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
