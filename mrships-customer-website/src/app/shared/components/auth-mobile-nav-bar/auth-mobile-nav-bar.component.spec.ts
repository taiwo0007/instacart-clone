import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMobileNavBarComponent } from './auth-mobile-nav-bar.component';

describe('AuthMobileNavBarComponent', () => {
  let component: AuthMobileNavBarComponent;
  let fixture: ComponentFixture<AuthMobileNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthMobileNavBarComponent]
    });
    fixture = TestBed.createComponent(AuthMobileNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
