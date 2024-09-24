import { createReducer, on } from "@ngrx/store";
import { addressCreateSuccess, authenticateFail, authenticateSuccess, clearError, createAddressStart, loginStart, logOff, signUpStart, updateAddressStart, updateCustomer } from "./auth.actions";
import { AuthState } from "./auth.state";
import { User } from '../models/user.model';


const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
  addressLoading: false,
  addressess: [],
  primaryAddress: null,
  customer: null

}

export const authReducer = createReducer(
  initialState,
  on(authenticateSuccess, (state, action) => {
    const user = new User(
      action.email,
      action.token,
      action.expirationDate
    );

    console.log("customer saved", action.customer)
    return {
      ...state,
      authError: null,
      user: user,
      loading: false,
      customer: action.customer,
      addressLoading: false,
      addressess: action.addresses,
      primaryAddress: action.primaryAddress
    };
  })
  ,
  on(loginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    };
  }),



  on(createAddressStart, (state, action) => {


    console.log("initial state", state)

    if (!state.primaryAddress) {

      return {
        ...state,
        addressess: [...state.addressess, action.address],
        addressLoading: true,
        primaryAddress: action.address
      };
    }

    return {
      ...state,
      addressess: [...state.addressess, action.address],
      addressLoading: true
    };
  }),
  on(updateCustomer, (state, action) => {


    console.log("customer: action.customer", state)

    return {
      ...state,
      customer: action.customer
    };
  }),
  on(addressCreateSuccess, (state, action) => {

    const updatedAddressess = [...state.addressess]

    const recentUpdatedAddressIndex = state.addressess.findIndex(address => address.id === null);

    let updatedAddress;

    if (recentUpdatedAddressIndex !== -1) {
      updatedAddress = {
        ...state.addressess[recentUpdatedAddressIndex],
        id: action.id

      }

      updatedAddressess[recentUpdatedAddressIndex] = updatedAddress

      console.log("updatedAddressess", updatedAddressess);

      return {
        ...state,
        addressess: updatedAddressess,
        addressLoading: false
      }
    }

    return {
      ...state,
      addressLoading: false,
    };
  })
  ,
  on(updateAddressStart, (state, action) => {

    const updatedAddressess = [...state.addressess]
    const recentUpdatedAddressIndex = state.addressess.findIndex(address => address.id === action.address.id);
    let updatedAddress;
    if (recentUpdatedAddressIndex !== -1) {
      updatedAddressess[recentUpdatedAddressIndex] = action.address

      console.log("updatedAddressess", updatedAddressess);
      if (state.primaryAddress?.id === action.address.id) {
        return {
          ...state,
          addressess: updatedAddressess,
          addressLoading: false,
          primaryAddress: action.address
        }
      }

      if (action.setAsPrimaryAddress) {

        return {
          ...state,
          addressLoading: false,
          addressess: updatedAddressess,
          primaryAddress: action.address
        }
      }

      return {
        ...state,
        addressess: updatedAddressess,
        addressLoading: false
      }
    }
    return {
      ...state,
      addressLoading: false,
    };
  }),
  on(signUpStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    };
  }),
  on(authenticateFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.error,
      loading: false,
    };
  }),
  on(clearError, (state) => {
    return {
      ...state,
      authError: null,
    };
  }),
  on(logOff, (state) => {
    return {
      ...state,
      customer: null,
      addressess: [],
      primaryAddress: null,

      user: null,
    };
  })
)
