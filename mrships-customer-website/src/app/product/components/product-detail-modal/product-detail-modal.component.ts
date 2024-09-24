import {Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import {Product} from "../../models/product.interface";
import {Store} from "@ngrx/store";
import {addToCart} from "../../../cart/store/cart.actions";
import {AppState} from "../../../store/app.reducer";
import {selectBranchId} from "../../../branch/store/branch.selector";
import {Observable, takeUntil} from "rxjs";
import {selectProductVariationQuantity} from "../../../cart/store/cart.selector";
import * as Console from "console";
import {ProductService} from "../../services/product.service";
import { Variation } from '../../models/variation.interface';


@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent implements OnInit, OnChanges {
  product: Product | undefined;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isQuantityOpened: boolean = false;
  isVariationOpened: boolean = false;
  branchId$: Observable<number | null>;
  productQuantity$: Observable<number | null> | undefined;
  branchId: number | undefined;
  productQuantity: number | undefined;
  isInCart: boolean = false;
  subCategoryProducts: Product[]  = []
  selectedProductVariation!: Variation;
  selectedProductVariationCartQuantity: number = 0;

  constructor(
    private uiService: UiServiceService,
    private store: Store<AppState>,
    private productService:ProductService
  ) {
    this.branchId$ = this.store.select(selectBranchId)

  }


  ngOnInit(): void {

    this.updateProductData()
    this.selectedQuantity = 0;

    if (this.product && this.branchId) {
      this.productQuantity$ = this.store.select(selectProductVariationQuantity(this.selectedProductVariation.id, this.branchId))

    }


  }

  ngOnChanges(changes: SimpleChanges): void {
    
    
  }

  getSubCategoryProducts(productId: number){

    this.productService.fetchSubCategoryProducts(productId).subscribe((products:Product[]) => {

      this.subCategoryProducts = products
    })
  }

  updateProductData(): void {
    this.uiService.selectedProductSource$.subscribe(data => {
      console.log('Selected Product Data:', data);

      if(data.isFromModal) {
        this.product = data.product;
        this.selectedProductVariation = data.product.variations[0];
      }
      else {
        this.product = data;
        this.selectedProductVariation = this.selectedProductVariation || data.variations[0];
      }
     

      this.branchId$.subscribe((selectedBranchId: number | null) => {
        if (selectedBranchId) {
          this.branchId = selectedBranchId;

          if (this.product && this.branchId) {

            this.getSubCategoryProducts(this.product.id)

            this.productQuantity$ = this.store.select(selectProductVariationQuantity(this.selectedProductVariation.id, this.branchId));
            this.productQuantity$.subscribe((selectedProdVariationQuantity: number | null) => {

              console.log("selectedProdVariationQuantity",selectedProdVariationQuantity)

              if (selectedProdVariationQuantity || selectedProdVariationQuantity === 0) {
                this.productQuantity = selectedProdVariationQuantity;
                // this.selectedQuantity = 
                this.selectedProductVariationCartQuantity = selectedProdVariationQuantity;
                this.isInCart = selectedProdVariationQuantity !== 0
                
              }
            });
          }
        }
      });


    })


  }

  openQuantitySelect(): void {
    this.isQuantityOpened = true;
  }

  closeQuantitySelect(): void {
    this.isQuantityOpened = false;
  }

  toggleQuantitySelect(): void {
    this.isQuantityOpened = !this.isQuantityOpened;

  }

  toggleVariationSelect(): void {
    this.isVariationOpened = !this.isVariationOpened;

  }

  


  closeModal() {

    this.uiService.isProductDetailOpen$.next(false);
    this.uiService.selectedProductSource$.next(null)
  }

  onSelectQuantity(quantity: number) {
    this.closeQuantitySelect()
    this.selectedQuantity = quantity;
  }

  onSelectProductVariation(variation: Variation) {

    this.toggleVariationSelect()
    this.selectedProductVariation = variation;
    this.updateProductData()
    this.selectedQuantity = 0;
  }

  // https://chat.openai.com/c/a0738a79-8e19-484c-8b42-2afde179e0d7
  addToCart(): void {

    const variation_id = this.selectedProductVariation.id


    if (!this.product || !this.branchId || !variation_id || !this.product.variations) {
      console.log("Product or branch is undefined")
      return;
    }

    this.store.dispatch(addToCart({
      product: this.product,
      variation_id,
      quantity: this.selectedQuantity === 0 ? 1 : this.selectedQuantity,
      branch_id: this.branchId
    }));

    this.selectedQuantity = 0;

  }


}
