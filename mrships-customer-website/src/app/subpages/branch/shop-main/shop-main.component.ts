import {Component, OnInit} from '@angular/core';
import {BranchService} from "../../../branch/services/branch.service";
import {Branch} from "../../../branch/models/branch.interface";
import {selectStoreId} from "../../../branch/store/branch.selector";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import { combineLatest } from 'rxjs';
import { selectUserState } from 'src/app/auth/store/auth.selector';
import { User } from 'src/app/auth/models/user.model';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-shop-main',
  templateUrl: './shop-main.component.html',
  styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit {

  branch: Branch | undefined;
  user: User | undefined

  constructor(private branchService: BranchService,
              private store:Store<AppState>,
              private uiService:UiServiceService
              
            ) {
  }

  ngOnInit(): void {

    combineLatest([
      this.store.select(selectStoreId),
      this.store.select(selectUserState)
    ])
    .subscribe(([selectedStoreId, user]) => {
      console.log("selectedStoreId", selectedStoreId);
      console.log("user", user);

      if (selectedStoreId) {
        this.initClosestBranch(selectedStoreId);
      }

      if(user === null) {

        this.uiService.isLoginOpen.next({isOpen: true, isClosable: false})
      }

    }) 

  }


  initClosestBranch(storeId:number): void {
    this.branchService.fetchClosestBranch(storeId).subscribe((branchData: Branch) => {

        console.log("branch", branchData)
        this.branch = branchData
      },
      (error) => {
        console.error("Error fetching closest branch:", error);
        // Handle error condition (e.g., display an error message)
      })
  }

}
