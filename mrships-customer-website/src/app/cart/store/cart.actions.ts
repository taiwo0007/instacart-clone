import { createAction, props } from '@ngrx/store';
import {Product} from "../../product/models/product.interface";


export const addToCart = createAction(
  '[Cart] addToCart',
  props<{ product: Product, variation_id: number, quantity:number, branch_id:number }>()
);

export const incrementQuantity = createAction(
  '[Cart] incrementQuantity',
  props<{ variation_id: number, branch_id:number }>()
);

export const decrementQuantity = createAction(
  '[Cart] decrementQuantity',
  props<{ variation_id: number, branch_id:number }>()
);

export const deleteQuantity = createAction(
  '[Cart] deleteQuantity',
  props<{ variation_id: number, branch_id:number }>()
);

export const removeBranchCart = createAction(
  '[Cart] Remove Branch Cart',
  props<{ branch_id:number }>()
);
