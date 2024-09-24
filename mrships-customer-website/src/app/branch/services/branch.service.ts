import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Branch} from "../models/branch.interface";
import {environment} from "../../../environments/environment";
import {Category} from "../../product/models/category.interface";
import {SubCategory} from "../../product/models/subcategory.interface";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  fetchClosestBranch(storeId:number){

    return this.http.get<Branch>(environment.appUrl+"/branch/"+storeId)
  }
  fetchBranchCategories(branchId: number){

    return this.http.get<Category[]>(environment.appUrl+"/branch/categories/"+branchId)
  }

  fetchBranchCategory(catId: number){

    return this.http.get<Category>(environment.appUrl+"/branch/category/"+catId)
  }
  fetchBranchSubCategory(subCatId: number){

    return this.http.get<SubCategory>(environment.appUrl+"/branch/sub-category/"+subCatId)
  }
}
