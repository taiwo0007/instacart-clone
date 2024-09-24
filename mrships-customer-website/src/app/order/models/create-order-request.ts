import { Address } from 'src/app/home/models/address.interface';
import { Customer } from "src/app/auth/models/customer.model";

export interface CreateOrderRequest {
    branch_id:number | null,
    quantity:number,
    customer_email:string,
    order_items: any,
    customer: Customer | null,
    fees:any,
    orderDate:string,


}
