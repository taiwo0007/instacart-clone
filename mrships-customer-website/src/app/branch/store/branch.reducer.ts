import {BranchState} from "./branch.state";
import {createReducer, on} from "@ngrx/store";
import {setBranchId, setCategoryId, setProductDetail, setStore, setStoreId} from "./branch.actions";


const initialState: BranchState = {
  selectedBranchId: -1,
  selectedStoreId: null,
  selectedCategoryId: null,
  selectedProductDetail: null,
  selectedStore: null
}

export const branchReducer = createReducer(
  initialState,
  on(setBranchId, (state, action) => {
    return {
      ...state,
      selectedBranchId: action.id
    };
  }),on(setStore, (state, action) => {
    return {
      ...state,
      selectedStore: action.store
    };
  }),
  on(setProductDetail, (state, action) => {
    return {
      ...state,
      selectedProductDetail: action.product
    };

  }),
  on(setStoreId, (state, action) => {
    return {
      ...state,
      selectedStoreId: action.id
    };
  }),
  on(setCategoryId, (state, action) => {
    return {
      ...state,
      selectedCategoryId: action.id
    };
  }),
)

