import {Component, HostListener, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-nav-bar-contianer',
  templateUrl: './nav-bar-contianer.component.html',
  styleUrls: ['./nav-bar-contianer.component.css']
})
export class NavBarContianerComponent implements OnInit {
  isMobile: boolean = window.innerWidth <= 768;
  isAuthenticated: boolean = false;
  constructor(private store:Store<AppState> ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    this.isMobile = window.innerWidth <= 768
  }

  ngOnInit(): void {

  this.store.select((state: AppState) => state.auth.user)
    .subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }

}
