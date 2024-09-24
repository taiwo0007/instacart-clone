import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Address } from 'src/app/home/models/address.interface';


@Component({
  selector: 'app-address-edit-modal',
  templateUrl: './address-edit-modal.component.html',
  styleUrls: ['./address-edit-modal.component.css']
})
export class AddressEditModalComponent implements OnInit, OnDestroy {
authSub: Subscription | undefined;
addressess: Address[]  = []
primaryAddress: Address | null = null;
showAddressList:boolean = true;
email:String | undefined;
loading: boolean = false;
editAddress:Address | undefined;
  constructor(private uiService:UiServiceService,
              private store:Store<AppState>) { }

  ngOnInit(): void {
    this.authSub = this.store
    .select('auth')
    .subscribe(state => {

      this.addressess = state.addressess
      this.primaryAddress = state.primaryAddress;

      console.log("this.primaryAddress",this.primaryAddress)
      
      
      if(state.user){
        this.email = state.user.email
      }

      this.loading = state.addressLoading

    })

  }

  closeAddressModal(){
    this.uiService.isAddressModalOpened.next(false)
  }

  setShowAddress(value:boolean){

    this.showAddressList = value
  }

  updateShowAddressList(event:any){

    this.showAddressList = event.showAddressList
    this.editAddress = event.address

  }

  ngOnDestroy(): void {
    if(this.addressess.length === 0){
    console.log("Address list is empty on component destroy");
    }
  }
}
