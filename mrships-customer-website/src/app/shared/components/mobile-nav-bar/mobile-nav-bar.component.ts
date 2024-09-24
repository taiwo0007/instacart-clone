import { Component, OnInit } from '@angular/core';
import {UiServiceService} from "../../services/ui-service.service";
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Store } from '@ngrx/store';
import { selectUserState } from 'src/app/auth/store/auth.selector';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.css']
})
export class MobileNavBarComponent implements OnInit {

  constructor(private uiService: UiServiceService, private store: Store<AuthState>) { }
  isAuthenticated: boolean = false;

  ngOnInit(): void {

    this.store.select((state:AuthState) => state.user)
    .subscribe(user => {

      this.isAuthenticated = user !== null
    })

  }

  openMainSideBar(): void {

    this.uiService.isMainSideBarOpen.next(true)
  }

  openSearchModal(){
    this.uiService.isSearchModalOpen.next(true)
  }
  closeSearchModal(){
    this.uiService.isSearchModalOpen.next(false)
  }

  openAddressModal() {
    this.uiService.isAddressModalOpened.next(true)
  }

}
