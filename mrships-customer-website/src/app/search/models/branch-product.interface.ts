import { Branch } from './../../branch/models/branch.interface';
import { Product } from "src/app/product/models/product.interface"

export interface BranchProduct {
    branch:Branch
    products:Product[]
}