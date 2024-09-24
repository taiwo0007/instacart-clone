import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { Address } from './../../../home/models/address.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-edit-panel',
  templateUrl: './address-edit-panel.component.html',
  styleUrls: ['./address-edit-panel.component.css']
})
export class AddressEditPanelComponent implements OnInit {
openAddressModal() {
this.uiService.isAddressModalOpened.next(true);
}

  @Input() address:Address | undefined;
  constructor(private uiService:UiServiceService) { }

  ngOnInit(): void {
  }

}
