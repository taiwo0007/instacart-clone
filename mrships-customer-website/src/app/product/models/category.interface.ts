import {SubCategory} from "./subcategory.interface";

export interface Category {
  id: number
  subCategories: SubCategory[]
  categoryName: string
}
