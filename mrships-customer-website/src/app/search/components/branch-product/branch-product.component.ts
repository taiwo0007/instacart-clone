import { BranchProduct } from 'src/app/search/models/branch-product.interface';
import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product} from "../../../product/models/product.interface";

@Component({
  selector: 'app-branch-product',
  templateUrl: './branch-product.component.html',
  styleUrls: ['./branch-product.component.css']
})
export class BranchProductComponent implements OnInit{
  productWidth = 307; // Width of each product
  products:Product[] = [];
  @Input() branchProduct!:BranchProduct;


  ngOnInit() {

    this.updateDisplayedProducts()

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const windowWidth = window.innerWidth;
    let productsToDisplay = 0;

    if (windowWidth <= 640) productsToDisplay = 2;
    else if (windowWidth <= 768) productsToDisplay = 3;
    else if (windowWidth <= 1024) productsToDisplay = 4;
    else if (windowWidth <= 1280) productsToDisplay = Math.floor(windowWidth / this.productWidth);
    else productsToDisplay = Math.floor(windowWidth / this.productWidth);

    if(this.branchProduct){
      this.products = this.branchProduct.products.slice(0, productsToDisplay);

    }
  }

}
