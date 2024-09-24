import {Category} from "../../product/models/category.interface";
import {Store} from "../../home/models/store";
import {Address} from "../../home/models/address.interface";

export interface Branch {
  id: number
  categories: Category[]
  store: Store
  address: Address
}
