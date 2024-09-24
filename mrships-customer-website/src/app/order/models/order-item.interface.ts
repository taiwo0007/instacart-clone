import { Product } from 'src/app/product/models/product.interface';
import { Variation } from './../../product/models/variation.interface';
export interface OrderItem {
    id: number
    product: Product
    variation: Variation
    quantity: number
    total: number
  }