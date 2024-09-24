import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/auth/models/customer.model';
import { User } from 'src/app/auth/models/user.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.css']
})
export class ProfileContactsComponent implements OnInit {

  constructor(private store:Store<AppState>) { }
  authSub:Subscription |undefined
  user:User | null | undefined;
  customer:Customer | undefined | null;
  ngOnInit(): void {

    this.authSub = this.store.select("auth").subscribe(auth => {
      this.user = auth.user
      this.customer = auth.customer

    })
  }

}
