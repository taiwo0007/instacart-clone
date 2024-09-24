import {Product} from "./product.interface";

export interface SubCategory {
  id: number
  products: Product[]
  subCategoryName: string
}
