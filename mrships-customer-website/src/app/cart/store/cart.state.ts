import {Product} from "../../product/models/product.interface";
import {Variation} from "../../product/models/variation.interface";

export interface CartItem{

  product_id:number,
  variation_id:number,
  product:Product,
  total:number,
  quantity:number
}

export interface BranchCart{
  branchId: number,
  cartItems: CartItem[],
  total:number,
  quantity:number
}

export interface CartState {
  allBranchCarts: BranchCart[];
  // selectedBranchId:number
}
