import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import { clearError, signUpStart } from '../../store/auth.actions';

@Component({
  selector: 'signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit{
  error: any;
  isLoading: boolean = false
  private authSub: Subscription = new Subscription;

  constructor(private uiService:UiServiceService,
              private store:Store<AppState>) {
  }

  ngOnInit(): void {
    this.authSub =  this.store
    .select("auth")
    .subscribe(state => {
      console.log(state)

      this.error = state.authError
      this.isLoading = state.loading

    })
  }

  closeSignUpModal(){
    this.onHandleError()
    this.uiService.isSignUpOpen.next({isOpen: false, isClosable: true})
  }

  navigateToLogin() {
    this.onHandleError()

    this.closeSignUpModal()

    this.uiService.isLoginOpen.next({isOpen: true, isClosable: true})
  }


  onSubmit(authForm: NgForm) {
    this.onHandleError()


    if(!authForm.valid){
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password
    
    this.store.dispatch(signUpStart({email, password}))



  }
  onHandleError() {
    this.store.dispatch(clearError());
  }
}
