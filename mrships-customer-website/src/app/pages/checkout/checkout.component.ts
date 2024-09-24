import { CheckoutFormComponent } from './../../checkout/checkout-form/checkout-form.component';
import { selectBranchId } from 'src/app/branch/store/branch.selector';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckoutService } from 'src/app/checkout/services/checkout.service';
import { AppState } from 'src/app/store/app.reducer';
import { selectBranchCartTotal } from 'src/app/cart/store/cart.selector';
import { CalculatedFee } from 'src/app/checkout/models/calculated-fee.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(CheckoutFormComponent) formComponent!: CheckoutFormComponent;

  calculatedFee:CalculatedFee | undefined;
  cartTotalSub:Subscription | undefined;
  branchSub:Subscription | undefined;
  constructor(private checkoutService:CheckoutService,
              private store:Store<AppState>) {}

  ngOnInit(): void {
    this.branchSub = this.store.select(selectBranchId).subscribe(id => {
      if(id){
        this.calculateCheckoutFee(id);
      }
    })
  }


onSiblingSubmit() {
  this.formComponent.onSubmit();
}
 
  calculateCheckoutFee(branchId:number){
    this.cartTotalSub = this.store.select(selectBranchCartTotal(branchId)).subscribe(total => {
      if(total){
        this.checkoutService.calculateFee(total).subscribe(data => {
            this.calculatedFee = data;
        })
      }
      });
  }
}
