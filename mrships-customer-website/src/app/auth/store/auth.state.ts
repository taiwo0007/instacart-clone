import {Product} from "../../product/models/product.interface";
import {Store} from "../../home/models/store";
import { User } from "../models/user.model";
import { Address } from "src/app/home/models/address.interface";
import { Customer } from "../models/customer.model";

export interface AuthState {
    user: User | null,
    addressess: Address[]
    addressLoading: boolean,
    authError: string | null,
    loading: boolean,
    primaryAddress: Address | null,
    customer: Customer | null

}
