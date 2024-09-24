import { Address } from './../../../home/models/address.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth/store/auth.state';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  authSub:Subscription | undefined;
  constructor(private uiService:UiServiceService,private store:Store<AppState>) { }
  addresses:Address[] = [];
  ngOnInit(): void {

    this.authSub = this.store.select('auth').subscribe((auth:AuthState) => {
    
      this.addresses = auth.addressess;

    });
  }

  closeAddressModal(){
    this.uiService.isAddressModalOpened.next(true)
  }

}
