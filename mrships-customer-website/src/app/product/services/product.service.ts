import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Branch} from "../../branch/models/branch.interface";
import {environment} from "../../../environments/environment";
import {Product} from "../models/product.interface";
import {A} from "@angular/cdk/keycodes";
import {of} from "rxjs";
import { BranchProduct } from 'src/app/search/models/branch-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  fetchSubCategoryProducts(productId:number){
    return this.http.get<Product[]>(environment.appUrl+"/product/"+productId+"/related-sub-category-products")
  }

  searchProductBySearchTerm(searchTerm: string, branchId: number | undefined){

    if(searchTerm && branchId){
      const url = `${environment.appUrl}/product/search-products`
      const params = {
        searchTerm,
        branchId
      }
      return this.http.get<Product[]>(url, {params:params})
    }

    return of([])


  }

  searchBranchProductsBySearchTerm(searchTerm: string){

    if(searchTerm){
      const url = `${environment.appUrl}/product/search-all-branch-products`
      const params = {
        searchTerm,
      }
      return this.http.get<BranchProduct[]>(url, {params:params})
    }

    return of([])


  }

}
