import {
  AllBranchProductSearchResultsComponent
} from './pages/all-branch-product-search-results/all-branch-product-search-results.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {NgModule} from "@angular/core";
import {BranchComponent} from "./pages/branch/branch.component";
import {ShopMainComponent} from "./subpages/branch/shop-main/shop-main.component";
import {BuyAgainComponent} from "./subpages/branch/buy-again/buy-again.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {SalesComponent} from "./subpages/branch/sales/sales.component";
import {CategoryComponent} from "./subpages/branch/category/category.component";
import {SubCategoryComponent} from "./subpages/branch/sub-category/sub-category.component";
import {AccountComponent} from "./pages/account/account.component";
import {ProfileComponent} from "./subpages/account/profile/profile.component";
import {AddressesComponent} from "./subpages/account/addresses/addresses.component";
import {OrdersComponent} from "./subpages/account/orders/orders.component";
import {PaymentMethodsComponent} from "./subpages/account/payment-methods/payment-methods.component";
import {SearchResultsComponent} from "./subpages/branch/search-results/search-results.component";
import {OrderCompleteComponent} from "./pages/order-complete/order-complete.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stores', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'order-complete', component: OrderCompleteComponent},
  {path: 'all-branch-products-search', component: AllBranchProductSearchResultsComponent},
  {
    path: 'account', component: AccountComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'addresses', component: AddressesComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'payment-methods', component: PaymentMethodsComponent},

    ]

  },

  {
    path: 'branch/:store-name', component: BranchComponent,
    children: [
      {path: '', redirectTo: 'shop', pathMatch: 'full'},
      {path: 'shop', component: ShopMainComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'buy-again', component: BuyAgainComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'category/:id', component: CategoryComponent},
      {path: 'sub-category/:id', component: SubCategoryComponent},
      {path: 'search-results', component: SearchResultsComponent},


    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
