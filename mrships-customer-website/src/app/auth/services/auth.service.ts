import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../store/auth.effects';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private http:HttpClient) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }


  login(email: string, password:string){
      const url  = `${environment.appUrl}/auth/login`
      return this.http.post<AuthResponseData>(url, {
        enteredEmail:email,
        password
      })
  }
  signUp(email: string, password:string){
      const url  = `${environment.appUrl}/auth/signup`
      return this.http.post<AuthResponseData>(url, {
        enteredEmail:email,
        password
      })
  }
}
