import {BranchState} from "../../branch/store/branch.state";
import {BranchCart, CartState} from "./cart.state";
import {createSelector} from "@ngrx/store";

export const selectCartState = (state: {cart: CartState}) => state.cart

export const selectCartQuantity = (branchId: number) =>
  createSelector(selectCartState, (cartState) => {
    // Find the BranchCart based on the branchId
    const branchCart = cartState.allBranchCarts.find(
      (cart) => cart.branchId === branchId
    );

    // Return the total quantity or 0 if branchCart is not found
    return branchCart ? branchCart.quantity : 0;
  });

export const selectProductVariationQuantity = (variationId: number, branchId:number) =>
  createSelector(selectCartState, (cartState) => {

    let productVariation;
    const branchCart = cartState.allBranchCarts.find(
      (cart) => cart.branchId === branchId
    );

    if(branchCart){
      productVariation = branchCart.cartItems.find(item => item.variation_id === variationId)
    }

    return productVariation ? productVariation.quantity : 0;
  });

export const selectCartItems = ( branchId:number) =>
  createSelector(selectCartState, (cartState) => {
    return cartState.allBranchCarts.find(
      (cart) => cart.branchId === branchId
    )?.cartItems || []
  });

  export const selectBranchCart = (branchId:number) =>
  createSelector(selectCartState, (cartState) => {
    return cartState.allBranchCarts.find(
      (cart) => cart.branchId === branchId
    ) 
  });

export const selectBranchCartTotal = (branchId: number | undefined) =>
  createSelector(selectCartState, (cartState) => {
    return cartState.allBranchCarts.find(
      (cart) => cart.branchId === branchId
    )?.total || 0
  });
