import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditPanelComponent } from './address-edit-panel.component';

describe('AddressEditPanelComponent', () => {
  let component: AddressEditPanelComponent;
  let fixture: ComponentFixture<AddressEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressEditPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
