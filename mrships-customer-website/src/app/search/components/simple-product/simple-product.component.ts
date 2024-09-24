
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UiServiceService} from "../../../shared/services/ui-service.service";


import {Observable} from "rxjs";
import {selectProductVariationQuantity} from "../../../cart/store/cart.selector";
import {selectBranchId} from "../../../branch/store/branch.selector";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {addToCart, decrementQuantity, incrementQuantity} from "../../../cart/store/cart.actions";
import {setProductDetail} from "../../../branch/store/branch.actions";
import { Product } from 'src/app/product/models/product.interface';
import { Branch } from 'src/app/branch/models/branch.interface';
@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  styleUrls: ['./simple-product.component.css']
})
export class SimpleProductComponent implements OnInit {
  @Input() product: any;
  @Input()
  branch!: Branch;
  @Input() image: any;
  @Input() isCatRoute: boolean = false;
  @Input() isFromSearchRoute: boolean = false;

  MOBILE_SCREEN_WIDTH:number = 768;
  branchId$: Observable<number | null>;
  productQuantity$: Observable<number | null> | undefined;
  branchId: number | undefined;
  productQuantity: number | undefined;
  isInCart: boolean = false;


  constructor(private router: Router,
              private uiService: UiServiceService,
              private route: ActivatedRoute,
              private store: Store<AppState>
  ) {
    this.branchId$ = this.store.select(selectBranchId)

  }

  ngOnInit(): void {

    this.updateProductData()
  }


  updateProductData(): void {

    this.branchId$.subscribe((selectedBranchId: number | null) => {
      if (selectedBranchId) {
        this.branchId = selectedBranchId;

        if (this.product && this.branchId) {

          this.productQuantity$ = this.store.select(selectProductVariationQuantity(this.product.variations[0]?.id, this.branchId));
          this.productQuantity$.subscribe((selectedProdVariationQuantity: number | null) => {

            if (selectedProdVariationQuantity || selectedProdVariationQuantity === 0) {
              this.productQuantity = selectedProdVariationQuantity;
              this.isInCart = selectedProdVariationQuantity !== 0
            }
          });
        }
      }
    });


  }

  openProductDetail(product: Product) {
    console.log(product);
    this.uiService.selectedProductSource$.next(product);
    this.store.dispatch(setProductDetail({ product }));
    console.log('Window width:', window.innerWidth);
    console.log('MOBILE_SCREEN_WIDTH:', this.MOBILE_SCREEN_WIDTH);
    console.log('isFromSearchRoute:', this.isFromSearchRoute);
    console.log('Product ID:', product.id);
    console.log('Branch ID:', this.branch.id);

    if (window.innerWidth <= this.MOBILE_SCREEN_WIDTH && this.isFromSearchRoute === false) {
      this.navigateBasedOnCategoryRoute(product);
      return;
    }

    if (window.innerWidth <= this.MOBILE_SCREEN_WIDTH && this.isFromSearchRoute === true) {
      this.router.navigate(['/branch', this.branch.id, 'product', product.id]);
      return;
    }

    if (window.innerWidth > this.MOBILE_SCREEN_WIDTH && this.isFromSearchRoute === true) {
      this.router.navigate(['/branch', this.branch.store.name, 'shop']);
     
    }

    
    console.log('Branch ID:', this.branch.id);

    this.uiService.isProductDetailOpen$.next(true);
  }

  navigateBasedOnCategoryRoute(product: Product) {
    const path = this.isCatRoute ? ['../../product', product.id] : ['../product', product.id];
    this.router.navigate(path, { relativeTo: this.route });
  }

  incrementQuantity() {

    if (this.branchId) {
      this.store.dispatch(incrementQuantity({variation_id: this.product.variations[0].id, branch_id: this.branchId}))
    }
  }
  decrementQuantity() {

    if (this.branchId) {
      this.store.dispatch(decrementQuantity({variation_id: this.product.variations[0].id, branch_id: this.branchId}))
    }
  }

  addToCart(): void {

    const variation_id = this.product?.variations?.[0]?.id


    if (!this.product || !this.branchId || !variation_id || !this.product.variations) {
      console.log("Product or branch is undefined")
      return;
    }

    this.store.dispatch(addToCart({
      product: this.product,
      variation_id,
      quantity: 1,
      branch_id: this.branchId
    }));

  }
}
