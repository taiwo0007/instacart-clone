import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from "../../store/cart.state";
import {Variation} from "../../../product/models/variation.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {Subscription} from "rxjs";
import {selectBranchId} from "../../../branch/store/branch.selector";
import {decrementQuantity, deleteQuantity, incrementQuantity} from "../../store/cart.actions";

@Component({
  selector: 'app-branch-cart-itemm',
  templateUrl: './branch-cart-itemm.component.html',
  styleUrls: ['./branch-cart-itemm.component.css']
})
export class BranchCartItemmComponent implements OnInit {

  @Input() cartItem: CartItem | undefined;
  variation:Variation | undefined;
  subscription: Subscription | undefined;
  branchId: number | undefined;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    if(this.cartItem){
      this.variation = this.cartItem.product.variations.find(variant => variant.id === this.cartItem?.variation_id)
    }

    this.subscription = this.store.select(selectBranchId).subscribe(selectedBranchId => {

      this.branchId = selectedBranchId
    })


  }


  incrementQuantity() {

    if (this.branchId && this.cartItem) {
      this.store.dispatch(incrementQuantity({variation_id: this.cartItem.variation_id, branch_id: this.branchId}))
    }
  }
  decrementQuantity() {

    if (this.branchId && this.cartItem) {
      this.store.dispatch(decrementQuantity({variation_id: this.cartItem.variation_id, branch_id: this.branchId}))
    }
  }

  deleteQuantity() {
    if (this.branchId && this.cartItem) {
      this.store.dispatch(deleteQuantity({variation_id: this.cartItem.variation_id, branch_id: this.branchId}))
    }
  }
}
