import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from '../../services/auth.service';
import { clearError, loginStart } from '../../store/auth.actions';
import { map } from 'rxjs';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit, OnDestroy{

  error: any;
  isLoading: boolean = false
  isAuthenticated: boolean = false;
  isClosable: boolean = true
  private authSub: Subscription = new Subscription;

  constructor(private uiService:UiServiceService, 
    private authService:AuthService,
    private store:Store<AppState>) {
  }


  closeLoginModal() {
    this.onHandleError() 

    if(this.isClosable)
      this.uiService.isLoginOpen.next({isOpen: false, isClosable: true})
  }

  ngOnInit(): void {
      this.authSub =  this.store
      .select("auth")
      .subscribe(state => {
        console.log(state)

        this.error = state.authError
        this.isLoading = state.loading
        this.isAuthenticated = state.user !== null

      })

      this.uiService.isLoginOpen
      .subscribe(data => {

        this.isClosable = data.isClosable

      })
  }

  navigateToSignUp() {
    this.onHandleError() 
    this.closeLoginModal()
    this.uiService.isSignUpOpen.next({isOpen: false, isClosable: true})
  }

  onSubmit(authForm: NgForm) {

    this.onHandleError()
    
    console.log(authForm)

    if(!authForm.valid){
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password

    
    this.store.dispatch(loginStart({email, password}))
    console.log("dispatched")


  }

  onHandleError() {
    this.store.dispatch(clearError());
  }

  ngOnDestroy(): void {
      this.authSub.unsubscribe()
  }
}
