import {Component, OnInit} from '@angular/core';
import {UiServiceService} from 'src/app/shared/services/ui-service.service';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {selectBranchCartTotal} from "../../store/cart.selector";
import {selectBranchId} from "../../../branch/store/branch.selector";

@Component({
  selector: 'app-branch-checkout',
  templateUrl: './branch-checkout.component.html',
  styleUrls: ['./branch-checkout.component.css']
})
export class BranchCheckoutComponent implements OnInit {
  branchCartTotalSubscription: Subscription | undefined;
  branchSubscription: Subscription | undefined;
  branchId: number | undefined;
  total: number | undefined;
  constructor(private uiService: UiServiceService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.branchSubscription = this.store.select(selectBranchId).subscribe(selectedBranchId => {

      this.branchId = selectedBranchId;


    })
    if (this.branchId || this.branchId !== -1) {
      this.branchCartTotalSubscription = this.store.select(selectBranchCartTotal(this.branchId)).subscribe(

       ( selectedBranchCartTotal: number) => {
         this.total = selectedBranchCartTotal
       }
      )

    }

  }

  closeCart() {

    this.uiService.isBranchCartOpen.next(false)


  }

}
