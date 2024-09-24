import { Component, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import {FormControl} from "@angular/forms";
import {Subscription, debounce, debounceTime, exhaustMap, switchMap, tap} from "rxjs";
import {Product} from "../../../product/models/product.interface";
import {ProductService} from "../../../product/services/product.service";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {selectBranchId} from "../../store/branch.selector";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-branch-desktop-nav-bar',
  templateUrl: './branch-desktop-nav-bar.component.html',
  styleUrls: ['./branch-desktop-nav-bar.component.css']
})
export class BranchDesktopNavBarComponent implements OnInit {
  isSearchPanelOpen:boolean | undefined = false;
  inputControl = new FormControl('');
  branchId: number | undefined;
  productResults: Product[] | null = []
  isAuthenticated:boolean | undefined = false;
  authSubscription: Subscription | null = null;
  constructor(private uiService:UiServiceService,private route:ActivatedRoute, private productService:ProductService, private store:Store<AppState>, private router:Router) { }

  ngOnInit(): void {

   this.authSubscription = this.store.select("auth").subscribe(authState => {

    this.isAuthenticated = !!authState.user;
   })



  }

  openAddressModal() {
    this.uiService.isAddressModalOpened.next(true)
  }

  openBranchCart() {
    this.uiService.isBranchCartOpen.next(true)
  }

  openMainSideBar(){
    this.uiService.isMainSideBarOpen.next(true)

  }

  openLoginModal() {
    this.uiService.isLoginOpen.next({isOpen: true, isClosable: true})
  }
  openSignUpModal() {
    this.uiService.isSignUpOpen.next({isOpen: true, isClosable: true})
  }



 
}
