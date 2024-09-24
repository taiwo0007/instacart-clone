import { Component, OnInit } from '@angular/core';
import {Category} from "../../../product/models/category.interface";
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../branch/services/branch.service";
import {SubCategory} from "../../../product/models/subcategory.interface";

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  subCatId:number | undefined;
  subCat: SubCategory | undefined;
  constructor(private route:ActivatedRoute, private branchService:BranchService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.subCatId = +param['id']

      this.branchService.fetchBranchSubCategory(this.subCatId).subscribe((subCategory: SubCategory) => {
        this.subCat = subCategory;
        console.log("this.subCat",this.subCat)
      })


    })
  }

}
