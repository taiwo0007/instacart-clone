import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../branch/services/branch.service";
import {Category} from "../../../product/models/category.interface";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catId:number | undefined;
  constructor(private route:ActivatedRoute, private branchService:BranchService) { }
  cat: Category | undefined;

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      console.log(param['id'])
      this.catId = +param['id']


      this.branchService.fetchBranchCategory(this.catId).subscribe((category: Category) => {
        this.cat = category
      })


    })
  }

}
