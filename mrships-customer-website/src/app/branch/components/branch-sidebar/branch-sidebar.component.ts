import { AuthState } from './../../../auth/store/auth.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import {BranchService} from "../../services/branch.service";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {selectBranchId, selectCategoryId, selectStore} from "../../store/branch.selector";
import {Category} from "../../../product/models/category.interface";
import {ActivatedRoute} from "@angular/router";
import {setCategoryId} from "../../store/branch.actions";
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-sidebar',
  templateUrl: './branch-sidebar.component.html',
  styleUrls: ['./branch-sidebar.component.css']
})
export class BranchSidebarComponent implements OnInit, OnDestroy {
  isBarOpened:boolean | undefined;
  categories: any
  selectedCatId: number | undefined;
  retrievedStore:any;
  isAuthenticated: boolean = false;
  authSub:Subscription | undefined;
  constructor
  (
    private store:Store<AppState>,
    private uiService: UiServiceService,
    private branchService:BranchService,
  )
  { }

  ngOnInit(): void {


   

    this.uiService.isBranchBarOpen.subscribe(data => {
      this.isBarOpened = data
      console.log("The data", data)
    })

    this.store.select(selectStore).subscribe((selectedStore: any) => {

      if(selectedStore){
        this.retrievedStore = selectedStore
      }

    })

    this.store.select(selectBranchId).subscribe((selectBranchId: number | null) => {

      if(selectBranchId){
        this.branchService.fetchBranchCategories(selectBranchId)
          .subscribe((data: any) => {

            this.categories = data
            console.log("THE DATA", data)
          })

      }
    })

    this.store.select(selectCategoryId).subscribe(catId => {
      if(catId){


      this.selectedCatId = catId
      }
    })

  }



  closeBar() {


    this.uiService.isBranchBarOpen.next(false)
  }


  closeBarAndSetCatId(categoryId: number) {
    console.log("cat id", categoryId)
    this.store.dispatch(setCategoryId({id: categoryId}))
    this.closeBar()
  }

  ngOnDestroy(): void {
      this.authSub?.unsubscribe()
  }
}
