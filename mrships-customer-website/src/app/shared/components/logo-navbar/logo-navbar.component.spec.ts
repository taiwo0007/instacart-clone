import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNavbarComponent } from './logo-navbar.component';

describe('LogoNavbarComponent', () => {
  let component: LogoNavbarComponent;
  let fixture: ComponentFixture<LogoNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
