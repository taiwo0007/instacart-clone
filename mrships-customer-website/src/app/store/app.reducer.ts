import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import {BranchState} from "../branch/store/branch.state";
import {branchReducer} from "../branch/store/branch.reducer";
import {CartState} from "../cart/store/cart.state";
import {cartReducer} from "../cart/store/cart.reducer";
import { AuthState } from '../auth/store/auth.state';
import { authReducer } from '../auth/store/auth.reducer';

export interface AppState {
  branch: BranchState,
  cart: CartState,
  auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
  branch: branchReducer,
  cart:cartReducer,
  auth:authReducer
}

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {

  return (state, action) => {

    const result = reducer(state, action)
    console.groupCollapsed(action.type)

    console.log("prev state", state);
    console.log('action', action);
    console.log("end state", result);
    console.groupEnd();

    return result;

  }


}

export const metaReducers:MetaReducer<AppState>[] = [debugMeta]
