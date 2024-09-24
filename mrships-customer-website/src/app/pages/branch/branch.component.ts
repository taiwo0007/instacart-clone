import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AppState} from '../../store/app.reducer';
import {UiServiceService} from '../../shared/services/ui-service.service';
import {setBranchId} from '../../branch/store/branch.actions';
import {Branch} from "../../branch/models/branch.interface";
import {BranchService} from "../../branch/services/branch.service";
import {selectStoreId} from "../../branch/store/branch.selector";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy {
  isBarOpened: boolean = false;
  isProductDetailOpened: boolean = false;
  isBranchCartOpened: boolean = false;
  private branchSubscription: Subscription | undefined;
  branch: Branch | undefined;
  storeId: number | undefined;

  constructor(
    private uiService: UiServiceService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private branchService: BranchService
  ) {
  }

  ngOnInit(): void {
    console.log('width', window.innerWidth <= 768);


    this.store.select(selectStoreId).subscribe(selectedStoreId => {

      console.log("store id", selectedStoreId)

      // Initialize BRANCH ID
      if (selectedStoreId) {
        this.initBranchId(selectedStoreId);
      }


    })

    // Subscribe to product detail open state
    this.uiService.isProductDetailOpen$.subscribe(data => {
      this.isProductDetailOpened = data;
    });

    // Subscribe to branch cart open state
    this.uiService.isBranchCartOpen.subscribe(data => {
      this.isBranchCartOpened = data;
    });


  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.branchSubscription?.unsubscribe();
  }

  private initBranchId(storeId: number): void {

    this.branchService.fetchClosestBranch(storeId).subscribe((branchData: Branch) => {

        console.log("branch", branchData)
        this.branch = branchData
        this.store.dispatch(setBranchId({id: this.branch.id}))
      },
      (error) => {
        console.error("Error fetching closest branch:", error);
        // Handle error condition (e.g., display an error message)
      })
  }

  // private initBranchId(): void {
  //   // Subscribe to route params
  //   this.branchSubscription = this.route.params.subscribe(params => {
  //     const branchId = +params['id'];
  //     console.log(branchId);
  //     this.store.dispatch(setBranchId({ id: branchId }));
  //   });
  // }

  initClosestBranch(): void {
  }
}
