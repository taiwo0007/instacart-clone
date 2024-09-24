import {Component, OnInit} from '@angular/core';
import {UiServiceService} from "./shared/services/ui-service.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mr ships';
  isAddressModalOpened: boolean | undefined;
  isSearchModalOpen: boolean | undefined;
  isLoginOpened: boolean = false;
  isSignUpOpen: boolean = false;
  constructor(private uiService:UiServiceService, private router:Router) {
  }

  ngOnInit(): void {
    this.uiService.isAddressModalOpened.subscribe(data => {
      this.isAddressModalOpened = data;
    })
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0,0);
      }
    })

    this.uiService.isSearchModalOpen.subscribe(data => {
      this.isSearchModalOpen = data;
    })

    this.uiService.isLoginOpen.subscribe(data => {
      this.isLoginOpened = data.isOpen
    })

    this.uiService.isSignUpOpen.subscribe(data => {
      this.isSignUpOpen = data.isOpen
    })
  }

}
