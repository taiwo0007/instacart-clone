import { BranchProduct } from 'src/app/search/models/branch-product.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/product/services/product.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-all-branch-product-search-results',
  templateUrl: './all-branch-product-search-results.component.html',
  styleUrls: ['./all-branch-product-search-results.component.css']
})
export class AllBranchProductSearchResultsComponent implements OnInit{
  searchTerm: string = "";
  branchProducts:BranchProduct[] = []
  constructor(private store:Store<AppState>, private productService:ProductService, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.fetchAllSearchResults(this.searchTerm)
    });

  }

  fetchAllSearchResults(searchTerm:string) {
    this.productService.searchBranchProductsBySearchTerm(searchTerm).subscribe((data:BranchProduct[]) => {
      this.branchProducts = data;
      console.log("bp",this.branchProducts);
    })
  }

}