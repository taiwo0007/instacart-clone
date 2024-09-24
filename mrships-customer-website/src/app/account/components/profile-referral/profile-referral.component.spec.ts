import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReferralComponent } from './profile-referral.component';

describe('ProfileReferralComponent', () => {
  let component: ProfileReferralComponent;
  let fixture: ComponentFixture<ProfileReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
