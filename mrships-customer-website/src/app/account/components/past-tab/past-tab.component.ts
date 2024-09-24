import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order.interface';

@Component({
  selector: 'app-past-tab',
  templateUrl: './past-tab.component.html',
  styleUrls: ['./past-tab.component.css']
})
export class PastTabComponent implements OnInit {

  @Input() orders:Order[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
