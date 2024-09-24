import { Component, OnInit } from '@angular/core';
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {selectBranchId, selectBranchState} from "../../branch/store/branch.selector";
import {Product} from "../../product/models/product.interface";
import {BranchState} from "../../branch/store/branch.state";
import {Observable} from "rxjs";
import {UiServiceService} from "../../shared/services/ui-service.service";
import {selectProductVariationQuantity} from "../../cart/store/cart.selector";
import {addToCart} from "../../cart/store/cart.actions";
import {Variation} from "../../product/models/variation.interface";
import {ProductService} from "../../product/services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  product: Product | null | undefined;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isQuantityOpened: boolean = false;
  branchId$: Observable<number | null>;
  productQuantity$: Observable<number | null> | undefined;
  branchId: number | undefined;
  productQuantity: number | undefined;
  isInCart: boolean = false;
  variation: Variation | undefined;
  subCategoryProducts: Product[] = [];
  selectedProductVariation!: Variation;
  selectedProductVariationCartQuantity: number = 0;
  isVariationOpened: boolean = false;



  constructor(private store:Store<AppState>,private uiService: UiServiceService, private productService:ProductService) {

    this.branchId$ = this.store.select(selectBranchId)

  }

  ngOnInit(): void {

    this.updateProductData()
    this.selectedQuantity = 0;

    this.store.select(selectBranchState).subscribe((data: BranchState) => {

      console.log("Branch State Data:", data);


      
      if(data.selectedProductDetail && data.selectedProductDetail.variations){
        this.product = data.selectedProductDetail
        this.selectedProductVariation = data.selectedProductDetail.variations[0]

      }
    })

    if (this.product && this.branchId) {
      this.productQuantity$ = this.store.select(selectProductVariationQuantity(this.product.variations[0].id, this.branchId))

    }


  }

  getSubCategoryProducts(productId: number){

    this.productService.fetchSubCategoryProducts(productId).subscribe((products:Product[]) => {

      this.subCategoryProducts = products
    })
  }

  updateProductData(): void {
    this.store.select(selectBranchState).subscribe((data: BranchState) => {
      this.product = data.selectedProductDetail;
      console.log("Product ID:", this.product);
      this.selectedProductVariation = this.selectedProductVariation || data.selectedProductDetail?.variations[0] ;

      this.store.select(selectBranchId).subscribe((selectedBranchId: number | null) => {
        if (selectedBranchId) {
          console.log("Branch ID before assignment:", selectedBranchId);
          this.branchId = selectedBranchId;
          console.log("Branch ID after assignment:", selectedBranchId);

          
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

  selectQuantity(quantity: number) {
    this.closeQuantitySelect()
    this.selectedQuantity = quantity;
  }

  onSelectProductVariation(variation: Variation) {

    this.selectedProductVariation = variation;
    this.toggleVariationSelect()
    this.updateProductData()
    this.selectedQuantity = 0;
  }

  // https://chat.openai.com/c/a0738a79-8e19-484c-8b42-2afde179e0d7
  addToCart(): void {

    const variation_id = this.selectedProductVariation.id


    console.log("Product:", this.product);
    console.log("Branch ID:", this.branchId);
    console.log("Variation ID:", variation_id);
    console.log("Product Variations:", this.product?.variations);

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
