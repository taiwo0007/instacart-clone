import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { logOff } from 'src/app/auth/store/auth.actions';
import { AuthState } from 'src/app/auth/store/auth.state';
import { AppState } from 'src/app/store/app.reducer';
import {UiServiceService} from "../../services/ui-service.service";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit, OnDestroy {
  
  isMainSideBarOpen: boolean | undefined;
  authSub:Subscription | undefined;
  isAuthenticated:boolean = false;
  constructor(private uiService: UiServiceService,
    private store:Store<AppState>) { }
    
    ngOnInit(): void {
      
      this.uiService.isMainSideBarOpen.subscribe(data => {
        this.isMainSideBarOpen = data
      })
      
      
      
      this.authSub = this.store
      .select("auth")
      .pipe(map((authState: AuthState) => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user
      })
    }
    
    openLoginModal() {
      this.closeMainSideBar()
    this.uiService.isLoginOpen.next({isOpen: true, isClosable: true});
    }

    openSignupnModal() {
      this.closeMainSideBar()
    this.uiService.isSignUpOpen.next({isOpen: true, isClosable: true});
    }
    
    closeMainSideBar(): void {

    this.uiService.isMainSideBarOpen.next(false)
  }

  ngOnDestroy(): void {
      this.authSub?.unsubscribe()
  }

  signOut() {
    this.closeMainSideBar()
    this.store.dispatch(logOff())
    }

}
