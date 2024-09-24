import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UiServiceService} from "../../../shared/services/ui-service.service";
import {Variation} from "../../models/variation.interface";
import {Product} from "../../models/product.interface";
import {Observable} from "rxjs";
import {selectProductVariationQuantity} from "../../../cart/store/cart.selector";
import {selectBranchId} from "../../../branch/store/branch.selector";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {addToCart, decrementQuantity, incrementQuantity} from "../../../cart/store/cart.actions";
import {setProductDetail} from "../../../branch/store/branch.actions";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() image: any;
  @Input() isCatRoute: boolean = false;
  @Input() isFromSearchRoute: boolean = false;
  @Input() isFromProductModal: boolean = false;
  @Input() branchId!: number;
  @Input() searchedBranchId!: number;

  MOBILE_SCREEN_WIDTH:number = 768;
  branchId$: Observable<number | null>;
  productQuantity$: Observable<number | null> | undefined;

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

    console.log('isFromProductModal:', this.isFromProductModal);
    console.log('Product:', product);

    if(this.isFromProductModal){
      this.uiService.selectedProductSource$.next({product: product, isFromModal: true});
    }
    else {
      this.uiService.selectedProductSource$.next(product);
    }
 
    this.store.dispatch(setProductDetail({ product }));

    if (window.innerWidth <= this.MOBILE_SCREEN_WIDTH && this.isFromSearchRoute === false) {
      this.navigateBasedOnCategoryRoute(product);
      return;
    }

    if (window.innerWidth <= this.MOBILE_SCREEN_WIDTH && this.isFromSearchRoute === true) {
      this.router.navigate(['/branch', this.searchedBranchId, 'product', product.id]);
      return;
    }



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
