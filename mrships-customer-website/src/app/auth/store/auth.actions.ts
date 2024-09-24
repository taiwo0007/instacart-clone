import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/home/models/address.interface";
import { Customer } from "../models/customer.model";



export const createAddressStart = createAction(
  '[Auth] Create Address Start',
  props<{ address: Address, email: string }>()
);

export const updateAddressStart = createAction(
  '[Auth] Update Address Start',
  props<{ address: Address, email: string, setAsPrimaryAddress: boolean }>()
);

export const addressCreateSuccess = createAction(
  '[Auth] Address Create Success',
  props<{ id: number }>()
);
export const addressUpdateSuccess = createAction(
  '[Auth] Address Update Success',
);

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string, password: string }>()
);
export const signUpStart = createAction(
  '[Auth] Sign Up Start',
  props<{ email: string, password: string }>()
);


export const updateCustomer = createAction(
  '[Auth] update Customer',
  props<{ customer: Customer }>()
);


export const authenticateSuccess = createAction(
  '[Auth] Login',
  props<{
    email: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
    addresses: Address[],
    primaryAddress: Address,
    customer: Customer | null
  }>()
);


export const authenticateFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);

export const clearError = createAction('[Auth] Clear Error');

export const logOff = createAction(
  '[Auth] Log Off'
);
