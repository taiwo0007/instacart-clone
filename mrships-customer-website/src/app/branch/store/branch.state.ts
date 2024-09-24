import {Product} from "../../product/models/product.interface";
import {Store} from "../../home/models/store";

export interface BranchState {
  selectedBranchId: number,
  selectedStoreId:number | null,
  selectedCategoryId: number | null,
  selectedProductDetail: Product | null
  selectedStore: Store | null;
}
