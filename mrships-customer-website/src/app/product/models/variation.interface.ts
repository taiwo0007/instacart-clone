import {ProductImage} from "./productimage.interface";

export interface Variation {
  id: number
  variationType?: string
  variationName?: string
  price: number
  productImages: ProductImage[]
  quantity: number
}
