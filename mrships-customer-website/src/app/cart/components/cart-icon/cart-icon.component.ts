import { Component, OnInit } from '@angular/core';
import { AppState } from "../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectCartQuantity } from "../../store/cart.selector";
import { selectBranchId } from "../../../branch/store/branch.selector";
import { Observable } from "rxjs";

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {

  branchId$: Observable<number | null>;
  branchId: number | undefined;
  cartQuantity$: Observable<number> | undefined;

  constructor(private store: Store<AppState>) {
    this.branchId$ = this.store.select(selectBranchId);
    if (this.branchId !== undefined) {
      this.cartQuantity$ = this.store.select(selectCartQuantity(this.branchId));
    }  }

  ngOnInit(): void {
    this.branchId$.subscribe((selectedBranchId: number | null) => {
      if (selectedBranchId) {
        this.branchId = selectedBranchId;
        this.cartQuantity$ = this.store.select(selectCartQuantity(this.branchId)); // Update cartQuantity$ when branchId changes
      }
    });
  }
}
