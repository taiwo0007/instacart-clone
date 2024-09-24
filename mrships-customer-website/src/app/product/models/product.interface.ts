import {Variation} from "./variation.interface";

export interface Product {
  id: number
  variations: Variation[]
  name?: string
  description?: string
  weight: string
}
