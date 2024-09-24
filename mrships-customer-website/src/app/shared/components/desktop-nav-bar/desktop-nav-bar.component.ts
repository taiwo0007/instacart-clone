import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import {UiServiceService} from "../../services/ui-service.service";

@Component({
  selector: 'app-desktop-nav-bar',
  templateUrl: './desktop-nav-bar.component.html',
  styleUrls: ['./desktop-nav-bar.component.css']
})
export class DesktopNavBarComponent implements OnInit {
  isSearchPanelOpen:boolean | undefined;
  isAuthenticated: boolean = false;
  private authSub: Subscription | undefined;
  constructor(private uiService:UiServiceService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.uiService.isSearchPanelOpen.subscribe(data => {
      this.isSearchPanelOpen = data;

    })

    this.authSub = this.store
    .select("auth")
    .pipe(map(state => state.user))
    .subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  openMainSideBar(): void {

    this.uiService.isMainSideBarOpen.next(true)
  }


  openAddressModal() {
    this.uiService.isAddressModalOpened.next(true)
  }

  openSearchPanel(){
    this.uiService.isSearchPanelOpen.next(true)
  }
  closeSearchPanel(){
    this.uiService.isSearchPanelOpen.next(false)
  }

  openLoginModal() {
    this.uiService.isLoginOpen.next({isOpen: true, isClosable: true})
  }
  openSignUpModal() {
    this.uiService.isSignUpOpen.next({isOpen: true, isClosable: true})
  }

}
