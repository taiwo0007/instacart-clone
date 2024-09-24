import { OrderService } from 'src/app/order/services/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/order/models/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService, private store: Store<AppState>,
    private router: Router
  ) { }
  authSub: Subscription | undefined;
  customerEmail: string | undefined;
  ongoingOrders: Order[] = [];
  pastOrders: Order[] = [];
  orders: Order[] = [];
  ngOnInit(): void {

    console.log("router state", history.state)

    this.authSub = this.store.select('auth').subscribe(authState => {

      this.customerEmail = authState.user?.email;

      if (this.customerEmail) {
        this.orderService.fetchOrdersForCustomer(this.customerEmail).subscribe(orders => {
          this.ongoingOrders = this.filterOngoingOrders(orders);
          this.pastOrders = this.filterPastOrders(orders);

          console.log("this.pastOrders", this.pastOrders)
          console.log("this.ongoingOrders", this.ongoingOrders)
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  filterOngoingOrders(orders: Order[]): Order[] {

    return orders.filter(order => {
      return order.status !== 'CANCELLED' && order.status !== 'DELIVERED';
    })

  }

  filterPastOrders(orders: Order[]): Order[] {

    return orders.filter(order => {
      return order.status === 'CANCELLED' || order.status === 'DELIVERED';
    })

  }

}
