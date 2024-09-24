import { Component, OnInit } from '@angular/core';
import { UiServiceService } from "../../../shared/services/ui-service.service";
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { selectStore } from 'src/app/branch/store/branch.selector';
import { Store as BranchStore } from 'src/app/home/models/store';
@Component({
  selector: 'app-branch-cart',
  templateUrl: './branch-cart.component.html',
  styleUrls: ['./branch-cart.component.css']
})
export class BranchCartComponent implements OnInit {

  cartCount: number = 0;
  constructor(private uiService: UiServiceService, private store: Store<AppState>) { }
  branchStore!: BranchStore;
  ngOnInit(): void {

    this.store.select(selectStore)
      .subscribe(data => {
        if (data) {
          this.branchStore = data
        }


      })
  }

  closeBranchCart() {
    this.uiService.isBranchCartOpen.next(false)
  }

  setCartCount(count: number) {
    console.log("count", count)
    this.cartCount = count
    console.log("this.cartCount", this.cartCount)
  }
}
