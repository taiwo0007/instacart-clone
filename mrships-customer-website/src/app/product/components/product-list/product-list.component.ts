import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SubCategory} from "../../models/subcategory.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product.interface";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() subCategory: SubCategory | undefined;
  @Input() isCatRoute: boolean = false;
  products: Product[] = []
  productWidth = 240; // Width of each product
 windowWidth = window.innerWidth;
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.updateDisplayedProducts();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const windowWidth = window.innerWidth;
    let productsToDisplay = 0;

    // if (windowWidth <= 640) productsToDisplay = 2;
    // else if (windowWidth <= 768) productsToDisplay = 3;
    // else 
    
    if (windowWidth <= 1024) productsToDisplay = 4;
    else if (windowWidth <= 1280) productsToDisplay = Math.floor(windowWidth / this.productWidth);
    else productsToDisplay = Math.floor(windowWidth / this.productWidth);

    this.products = this.subCategory?.products.slice(0, productsToDisplay) || [];
  }




  navigateToViewAll() {

    const path =  this.isCatRoute ? ['../../sub-category', this.subCategory?.id] : ['../sub-category', this.subCategory?.id]

    this.router.navigate(path, { relativeTo: this.route })

  }
}
