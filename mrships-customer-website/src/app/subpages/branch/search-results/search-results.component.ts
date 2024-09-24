import {Component, OnInit} from '@angular/core';
import {selectBranchId} from "../../../branch/store/branch.selector";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {ProductService} from "../../../product/services/product.service";
import {Product} from "../../../product/models/product.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{


  branchId!: number;
  products:Product[] = [];
  searchTerm: string = "";
  subCategoryProducts: Product[] | undefined;

  constructor(private store:Store<AppState>, private productService:ProductService, private route:ActivatedRoute) {
  }

  ngOnInit() {

    this.store.select(selectBranchId).subscribe((branchId: number) => {
      this.branchId = branchId
    })

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];

      this.fetchAllSearchResults(this.searchTerm)

    });

    // this.fetchAllSearchResults()

  }

  fetchAllSearchResults(searchTerm:string) {

    this.productService.searchProductBySearchTerm(searchTerm,this.branchId).subscribe((data:Product[]) => {

      this.products = data;

      if(this.products.length > 0) {
        this.getSubCategoryProducts(this.products[0].id)
      }
    })
  }


  getSubCategoryProducts(productId: number){

    this.productService.fetchSubCategoryProducts(productId).subscribe((products:Product[]) => {

      this.subCategoryProducts = products
    })
  }

}
