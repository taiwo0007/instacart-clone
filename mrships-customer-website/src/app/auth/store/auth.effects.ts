import { Address } from './../../home/models/address.interface';
import { AddressService } from './../../address/services/address.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { addressCreateSuccess, addressUpdateSuccess, authenticateFail, authenticateSuccess, createAddressStart, logOff, loginStart, signUpStart, updateAddressStart } from './auth.actions';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';




export interface AuthResponseData {
  email: string;
  authToken: string;
  expiresAt: string;
  addresses: Address[]
  primaryAddress: Address,
  customer: Customer
}

const handleError = (errorRes: any) => {

  console.log("errorRes", errorRes.error)
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error) {
    return of(authenticateFail({ error: errorMessage }));
  }
  return of(authenticateFail({ error: errorRes.error }));
};

@Injectable()
export class AuthEffects {

  handleAuthentication = (
    expiresIn: string,
    email: string,
    token: string,
    addresses: Address[],
    primaryAddress: Address,
    customer: Customer | null,
    isSignUp: boolean
  ) => {

    const expirationDate = new Date(expiresIn);

    console.log("expirationDate", expirationDate)
    console.log("token", token)
    console.log("email", email)
    console.log("primaryAddress:primaryAddress", primaryAddress)
    this.uiService.isLoginOpen.next({isOpen: false, isClosable: true})
    this.uiService.isSignUpOpen.next({isOpen: false, isClosable: true})

    if(addresses.length === 0 && isSignUp){
      this.uiService.isAddressModalOpened.next(true)
    }

    return authenticateSuccess({
      email: email,
      token: token,
      expirationDate: expirationDate,
      redirect: true,
      addresses: addresses,
      primaryAddress: primaryAddress,
      customer: customer
    });
  };

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private uiService: UiServiceService,
    private addressService: AddressService,
    private router:Router
  ) { }


  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((authData) => {
        return this.authService.login(authData.email, authData.password)
          .pipe(
            tap((resData: AuthResponseData) => {
              this.authService.setLogoutTimer(new Date(resData.expiresAt).getTime());
            }),
            map((resData) => {

              console.log("resData", resData)

              return this.handleAuthentication(
                resData.expiresAt,
                resData.email,
                resData.authToken,
                resData.addresses,
                resData.primaryAddress,
                resData.customer,
                false

              )
            }),
            catchError((errorRes) => handleError(errorRes))

          )
      })
    )
  )

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpStart),
      switchMap((authData) => {

        return this.authService.signUp(authData.email, authData.password)
          .pipe(
            tap((resData: AuthResponseData) => {
              this.authService.setLogoutTimer(new Date(resData.expiresAt).getTime());
            }),
            map((resData) => {
              return this.handleAuthentication(
                resData.expiresAt,
                resData.email,
                resData.authToken,
                [],
                resData.primaryAddress,
                null,
                true
              )
            }),
            catchError((errorRes) => handleError(errorRes))
          )
      })
    )
  )


  logOff = createEffect(() =>
    this.actions$.pipe(
      ofType(logOff),
      tap((data) => {
        this.authService.setLogoutTimer(0);
        this.router.navigate(['/']);
        this.uiService.isLoginOpen.next({isOpen: false, isClosable: true});
      }),
      
    ),
    {dispatch: false}
  )


  createAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddressStart),
      switchMap((formData) => {

        return this.addressService.addNewAddress(formData.address, formData.email)
          .pipe(
            map((addressData) => {

              console.log("addressData", addressData)
              this.uiService.isAddressModalOpened.next(false)
              return addressCreateSuccess({ id: addressData })
            }),
            catchError((errorRes) => handleError(errorRes))
          )
      })
    )
  )

  updateAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAddressStart),
      switchMap((formData) => {
        return this.addressService.updateExistingAddress(formData.address, formData.email, formData.setAsPrimaryAddress)
          .pipe(
            map((addressData) => {

              console.log("updated address", addressData)
              this.uiService.isAddressModalOpened.next(false)
              return addressUpdateSuccess()
            }),
            catchError((errorRes) => handleError(errorRes))
          )
      })
    )
  )

}


