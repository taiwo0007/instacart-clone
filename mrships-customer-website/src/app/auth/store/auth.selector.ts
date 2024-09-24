import {AuthState} from "./auth.state";


export const selectAuthState =  (state: {auth: AuthState}) => state.auth
export const selectUserState =  (state: {auth: AuthState}) => state.auth.user