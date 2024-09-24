import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product.interface";

@Component({
  selector: 'app-extra-product-list',
  templateUrl: './extra-product-list.component.html',
  styleUrls: ['./extra-product-list.component.css']
})
export class ExtraProductListComponent implements OnInit {

  @Input() products:Product[] = []
  @Input()  title: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
