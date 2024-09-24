import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Address, DEFAULT_ADDRESS } from 'src/app/home/models/address.interface';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'address-placeholder',
  templateUrl: './address-placeholder.component.html',
  styleUrls: ['./address-placeholder.component.css']
})
export class AddressPlaceholderComponent implements OnInit {
  authSub: Subscription | undefined;
  address: Address | undefined;
  isDefaultAddress: boolean = false
  isMobile: boolean = window.innerWidth <= 768
  constructor(private uiService: UiServiceService,
    private store: Store<AppState>
  ) {


  }

  ngOnInit(): void {
    this.authSub = this.store
      .select('auth')
      .subscribe(state => {
        console.log(state); // Log the state

        if (state.primaryAddress !== null) {
          this.address = state.primaryAddress
        }
        else {
          this.address = DEFAULT_ADDRESS
          this.isDefaultAddress = true
        }


      })
  }

  openAddressModal() {
    this.uiService.isAddressModalOpened.next(true)
  }

  closeAddressModal() {
    this.uiService.isAddressModalOpened.next(false)

  }

}
