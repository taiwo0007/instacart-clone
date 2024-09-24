import {Component, Input, OnInit} from '@angular/core';
import {SubCategory} from "../../models/subcategory.interface";
import {Product} from "../../models/product.interface";

@Component({
  selector: 'app-expanded-product-list',
  templateUrl: './expanded-product-list.component.html',
  styleUrls: ['./expanded-product-list.component.css']
})
export class ExpandedProductListComponent implements OnInit {

  @Input() isCatRoute: boolean = false;
  @Input() branchId!: number;
  @Input() isFromSearchRoute: boolean = false;

  @Input() products:Product[] = [];
  constructor() { }

  ngOnInit(): void {


  }

}
