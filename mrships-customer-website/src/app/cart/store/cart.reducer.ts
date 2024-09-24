import {createReducer, on} from "@ngrx/store";
import {BranchCart, CartItem, CartState} from "./cart.state";
import {addToCart, decrementQuantity, deleteQuantity, incrementQuantity, removeBranchCart} from "./cart.actions";


const initialState: CartState = {
  allBranchCarts: []
}

export const cartReducer = createReducer(
  initialState,
  on(deleteQuantity, (state, action) => {

    const branchId = action.branch_id;
    const branchIndex = state.allBranchCarts.findIndex(cart => cart.branchId === branchId)

    const cartIndex = state.allBranchCarts[branchIndex].cartItems.findIndex(item => item.variation_id === action.variation_id)


    const updatedCartItems = [...state.allBranchCarts[branchIndex].cartItems]

    updatedCartItems.splice(cartIndex, 1);


    const updatedBranchCart: BranchCart = {
      ...state.allBranchCarts[branchIndex],
      cartItems: updatedCartItems,
      total: updatedCartItems.reduce((total, item) => total + item.total, 0),
      quantity:  state.allBranchCarts[branchIndex].quantity - 1

    };

    const updatedBranchCarts = [...state.allBranchCarts]

    updatedBranchCarts[branchIndex] = updatedBranchCart

    return {
      ...state,
      allBranchCarts: updatedBranchCarts
    }
  }),
  on(decrementQuantity, (state, action) => {

    const branchId = action.branch_id;
    const branchIndex = state.allBranchCarts.findIndex(cart => cart.branchId === branchId)

    const cartIndex = state.allBranchCarts[branchIndex].cartItems.findIndex(item => item.variation_id === action.variation_id)


    const updatedCartItems = [...state.allBranchCarts[branchIndex].cartItems]

    let recentlyRemoved = false

    if(updatedCartItems[cartIndex].quantity - 1 === 0){
      recentlyRemoved = true
      updatedCartItems.splice(cartIndex, 1);
    }
    else{
      updatedCartItems[cartIndex] = {

        ...updatedCartItems[cartIndex],
        quantity: updatedCartItems[cartIndex].quantity - 1,
        total: updatedCartItems[cartIndex].total - (updatedCartItems[cartIndex].product.variations.find(variant => variant.id === action.variation_id)?.price || 0)
      }

    }

    const updatedBranchCart: BranchCart = {
      ...state.allBranchCarts[branchIndex],
      cartItems: updatedCartItems,
      total: updatedCartItems.reduce((total, item) => total + item.total, 0),
      quantity: recentlyRemoved ? state.allBranchCarts[branchIndex].quantity - 1 : state.allBranchCarts[branchIndex].quantity

  };

    const updatedBranchCarts = [...state.allBranchCarts]

    updatedBranchCarts[branchIndex] = updatedBranchCart

    return {
      ...state,
      allBranchCarts: updatedBranchCarts
    }
  }),
  on(removeBranchCart, (state, action) => {
    const updatedBranchCarts = state.allBranchCarts.filter(cart => cart.branchId !== action.branch_id);
    return {
      ...state,
      allBranchCarts: updatedBranchCarts
    }
  }),
  on(incrementQuantity, (state, action) => {

    const branchId = action.branch_id;
    const branchIndex = state.allBranchCarts.findIndex(cart => cart.branchId === branchId)

    const cartIndex = state.allBranchCarts[branchIndex].cartItems.findIndex(item => item.variation_id === action.variation_id)


    const updatedCartItems = [...state.allBranchCarts[branchIndex].cartItems]

    updatedCartItems[cartIndex] = {

      ...updatedCartItems[cartIndex],
      quantity: updatedCartItems[cartIndex].quantity + 1,
      total: updatedCartItems[cartIndex].total + (updatedCartItems[cartIndex].product.variations.find(variant => variant.id === action.variation_id)?.price || 0)
    }


    const updatedBranchCart: BranchCart = {
      ...state.allBranchCarts[branchIndex],
      cartItems: updatedCartItems,
      total: updatedCartItems.reduce((total, item) => total + item.total, 0),
      // quantity: updatedCartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
    };

    const updatedBranchCarts = [...state.allBranchCarts]

    updatedBranchCarts[branchIndex] = updatedBranchCart

    return {
      ...state,
      allBranchCarts: updatedBranchCarts
    }
    }

  ),
  on(addToCart, (state, action) => {


    console.log(action)

    const branchId = action.branch_id;

    const branchIndex = state.allBranchCarts.findIndex(cart => cart.branchId === branchId)

    const newCartItem: CartItem = {
      product_id: action.product.id,
      variation_id: action.variation_id,
      product: action.product,
      total: action.quantity * (action.product.variations.find(variation => variation.id === action.variation_id)?.price || 0),
      quantity: action.quantity
    }

    if (branchIndex !== -1) {

      const cartIndex = state.allBranchCarts[branchIndex].cartItems.findIndex(item => item.variation_id === action.variation_id)

      let updatedCartItems;
      let isInCart

      if (cartIndex !== -1) {

        updatedCartItems = state.allBranchCarts[branchIndex].cartItems.map((item, index) => {

          if (index === cartIndex) {

            return {
              ...item,
              total: action.quantity * (action.product.variations.find(variation => variation.id === action.variation_id)?.price || 0),
              quantity: action.quantity

            }
          } else {
            return item;
          }
        })

      } else {
        updatedCartItems = [...state.allBranchCarts[branchIndex].cartItems, newCartItem];
      }


      const updatedBranchCart: BranchCart = {
        ...state.allBranchCarts[branchIndex],
        cartItems: updatedCartItems,
        total: updatedCartItems.reduce((total, item) => item.total + total, 0),
        quantity: cartIndex !== -1 ? state.allBranchCarts[branchIndex].quantity : state.allBranchCarts[branchIndex].quantity + 1
      }

      const updatedBranchCarts = [...state.allBranchCarts]
      updatedBranchCarts[branchIndex] = updatedBranchCart


      console.log("existing")

      console.log(updatedBranchCarts)


      return {
        ...state,
        allBranchCarts: updatedBranchCarts
      }


    } else {

// If the branch cart doesn't exist, create a new one
      const newBranchCart: BranchCart = {
        branchId: branchId,
        cartItems: [newCartItem],
        total: newCartItem.total,
        quantity: 1
      };

      console.log("new")
      console.log(state.allBranchCarts)
      console.log(newBranchCart)


      return {
        ...state,
        allBranchCarts: [...state.allBranchCarts, newBranchCart]
      };

    }
  }),
)
