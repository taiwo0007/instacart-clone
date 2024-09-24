import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculatedFee } from '../models/calculated-fee.interface';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-checkout-price-summary',
  templateUrl: './checkout-price-summary.component.html',
  styleUrls: ['./checkout-price-summary.component.css']
})
export class CheckoutPriceSummaryComponent implements OnInit {

  @Output() submitForm = new EventEmitter<void>();
  isLoading: boolean = false;
  @Input() calculatedFee:CalculatedFee | undefined
  constructor(private uiService:UiServiceService) { }

  ngOnInit(): void {

    this.uiService.placeOrder.subscribe((data) => {
      this.isLoading = data

    })
  }

  onButtonClick() {
    this.submitForm.emit();

    this.uiService.placeOrder.next(true)
  }

}
