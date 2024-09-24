import {BranchState} from "./branch.state";


export const selectBranchState =  (state: {branch: BranchState}) => state.branch
export const selectBranchId =  (state: {branch: BranchState}) => state.branch.selectedBranchId
export const selectStoreId =  (state: {branch: BranchState}) => state.branch.selectedStoreId
export const selectCategoryId =  (state: {branch: BranchState}) => state.branch.selectedCategoryId
export const selectStore =  (state: {branch: BranchState}) => state.branch.selectedStore
