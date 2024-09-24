import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCartItems} from "../../store/cart.selector";
import {selectBranchId} from "../../../branch/store/branch.selector";
import {Observable} from "rxjs";
import {CartItem} from "../../store/cart.state";
import {AppState} from "../../../store/app.reducer";

@Component({
  selector: 'app-branch-cart-list',
  templateUrl: './branch-cart-list.component.html',
  styleUrls: ['./branch-cart-list.component.css']
})
export class BranchCartListComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  branchId$: Observable<number | null>;
  branchId: number | undefined;
  cartItems: CartItem[] = [];
  @Output() CartCount = new EventEmitter<number>();
  constructor(private store:Store<AppState>) {

    this.branchId$ = this.store.select(selectBranchId)


}

  ngOnInit(): void {

    this.branchId$.subscribe((selectedBranchId: number | null) => {

      if(selectedBranchId){
        this.branchId = selectedBranchId;

        this.store.select(selectCartItems(this.branchId)).subscribe(items => {

          this.cartItems = items;
          if(this.cartItems.length > 0){
            this.CartCount.emit(this.cartItems.length)

          }

        })


      }

    })
  }

}
