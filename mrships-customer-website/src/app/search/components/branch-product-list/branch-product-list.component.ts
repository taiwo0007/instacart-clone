import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/branch/models/branch.interface';
import { Product } from 'src/app/product/models/product.interface';
import { ProductService } from 'src/app/product/services/product.service';
import { BranchProduct } from '../../models/branch-product.interface';

@Component({
  selector: 'app-branch-product-list',
  templateUrl: './branch-product-list.component.html',
  styleUrls: ['./branch-product-list.component.css']
})
export class BranchProductListComponent implements OnInit{

  @Input() branchProducts:BranchProduct[] = [];

  constructor( ) {
  }


  ngOnInit(): void {
   

  }








}
