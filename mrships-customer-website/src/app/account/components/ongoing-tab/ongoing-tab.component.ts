import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order.interface';

@Component({
  selector: 'app-ongoing-tab',
  templateUrl: './ongoing-tab.component.html',
  styleUrls: ['./ongoing-tab.component.css']
})
export class OngoingTabComponent implements OnInit {

  @Input() orders:Order[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
