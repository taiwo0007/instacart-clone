import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/home/models/address.interface';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit{

  @Input() addressess: Address[] | undefined
  @Input() primaryAddress: Address | null | undefined
  @Output() ShowAddressListEvent: EventEmitter<{address:Address, showAddressList:boolean}> = new EventEmitter<{address:Address, showAddressList:boolean}>();
  constructor(){

  }

  ngOnInit(): void {
      
  }

  navigateToEditAddress(address:Address) {

    this.ShowAddressListEvent.emit({address:address, showAddressList:false})


  }

}
