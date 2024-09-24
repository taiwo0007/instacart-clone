import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from 'src/app/branch/models/branch.interface';
import { environment } from 'src/environments/environment';
import { CreateOrderRequest } from '../models/create-order-request';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(private http: HttpClient) { }

  createOrder(createOrderRequest:CreateOrderRequest){

    return this.http.post(environment.appUrl+"/orders/create-order",
    createOrderRequest)
  }

  fetchOrdersForCustomer(email:string){
    const params = { email: email };
    return this.http.get<Order[]>(environment.appUrl+"/orders/all-orders",
    { params: params })
  }
}
