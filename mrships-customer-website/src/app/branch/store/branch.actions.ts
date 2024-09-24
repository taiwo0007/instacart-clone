import { createAction, props } from '@ngrx/store';
import {Product} from "../../product/models/product.interface";
import {Store} from "../../home/models/store";


export const setBranchId = createAction(
  '[Branch] SetBranchId',
  props<{ id: number }>()
);

export const setStoreId = createAction(
  '[Branch] SetStoreId',
  props<{ id: number }>()
);

export const setCategoryId = createAction(
  '[Branch] SetCategoryId',
  props<{ id: number }>()
);
export const setProductDetail = createAction(
  '[Branch] SetProductDetail',
  props<{ product: Product }>()
);
export const setStore = createAction(
  '[Branch] SetStore',
  props<{ store: Store }>()
);
