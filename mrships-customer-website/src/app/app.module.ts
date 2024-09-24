import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { NavBarContianerComponent } from './shared/components/nav-bar-contianer/nav-bar-contianer.component';
import { DesktopNavBarComponent } from './shared/components/desktop-nav-bar/desktop-nav-bar.component';
import { MobileNavBarComponent } from './shared/components/mobile-nav-bar/mobile-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { StoreTileComponent } from './home/components/store-tile/store-tile.component';
import { CountryTileComponent } from './home/components/country-tile/country-tile.component';
import { BranchComponent } from './pages/branch/branch.component';
import { ShopMainComponent } from './subpages/branch/shop-main/shop-main.component';
import { BuyAgainComponent } from './subpages/branch/buy-again/buy-again.component';
import { BranchMobileNavBarComponent } from './branch/components/branch-mobile-nav-bar/branch-mobile-nav-bar.component';
import { BranchDesktopNavBarComponent } from './branch/components/branch-desktop-nav-bar/branch-desktop-nav-bar.component';
import { BranchNavBarContainerComponent } from './branch/components/branch-nav-bar-container/branch-nav-bar-container.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ProductComponent } from './product/components/product/product.component';
import { ProductDetailModalComponent } from './product/components/product-detail-modal/product-detail-modal.component';
import { PrimaryButtonComponent } from './shared/components/primary-button/primary-button.component';
import { ExtraProductListComponent } from './product/components/extra-product-list/extra-product-list.component';
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import { BranchCartComponent } from './cart/components/branch-cart/branch-cart.component';
import { BranchCartListComponent } from './cart/components/branch-cart-list/branch-cart-list.component';
import { BranchCartItemmComponent } from './cart/components/branch-cart-itemm/branch-cart-itemm.component';
import { BranchCheckoutComponent } from './cart/components/branch-checkout/branch-checkout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LogoNavbarComponent } from './shared/components/logo-navbar/logo-navbar.component';
import { CheckoutFormComponent } from './checkout/checkout-form/checkout-form.component';
import { CheckoutPriceSummaryComponent } from './checkout/checkout-price-summary/checkout-price-summary.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { DeliveryTimesDatesComponent } from './checkout/delivery-times-dates/delivery-times-dates.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SalesComponent } from './subpages/branch/sales/sales.component';
import { CategoryComponent } from './subpages/branch/category/category.component';
import { SubCategoryComponent } from './subpages/branch/sub-category/sub-category.component';
import { ExpandedProductListComponent } from './product/components/expanded-product-list/expanded-product-list.component';
import { BranchSidebarComponent } from './branch/components/branch-sidebar/branch-sidebar.component';
import { MainSidebarComponent } from './shared/components/main-sidebar/main-sidebar.component';
import { AccountComponent } from './pages/account/account.component';
import { OrdersComponent } from './subpages/account/orders/orders.component';
import { AccountSidebarComponent } from './account/components/account-sidebar/account-sidebar.component';
import { ProfileComponent } from './subpages/account/profile/profile.component';
import { AddressesComponent } from './subpages/account/addresses/addresses.component';
import { PaymentMethodsComponent } from './subpages/account/payment-methods/payment-methods.component';
import { ProfileContactsComponent } from './account/components/profile-contacts/profile-contacts.component';
import { ProfileReferralComponent } from './account/components/profile-referral/profile-referral.component';
import { AddressEditPanelComponent } from './account/components/address-edit-panel/address-edit-panel.component';
import { PaymentMethodPlaceholderComponent } from './account/components/payment-method-placeholder/payment-method-placeholder.component';
import {MatTabsModule} from "@angular/material/tabs";
import { OngoingTabComponent } from './account/components/ongoing-tab/ongoing-tab.component';
import {OrderItemComponent} from "./account/components/order-item/order-item.component";
import { PastTabComponent } from './account/components/past-tab/past-tab.component';
import { AddressEditModalComponent } from './address/components/address-edit-modal/address-edit-modal.component';
import {AddressEditFormComponent} from "./address/components/address-edit-form/address-edit-form.component";
import { CartIconComponent } from './cart/components/cart-icon/cart-icon.component';
import { BurgerIconComponent } from './shared/components/burger-icon/burger-icon.component';
import { ShopNowCardComponent } from './home/components/shop-now-card/shop-now-card.component';
import { SearchResultsPanelComponent } from './search/components/search-results-panel/search-results-panel.component';
import { SearchResultsModalComponent } from './search/components/search-results-modal/search-results-modal.component';
import { SubscriptionCardComponent } from './shared/components/subscription-card/subscription-card.component';
import {HttpClientModule} from "@angular/common/http";
import { Store } from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { StoreModule } from '@ngrx/store';
import {environment} from "../environments/environment";
import {branchReducer} from "./branch/store/branch.reducer";
import {appReducer, AppState, metaReducers} from "./store/app.reducer";
import {localStorageStrategy, PersistStateModule} from "@ngrx-addons/persist-state";
import { BeforeAppInit } from '@ngrx-addons/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoldWordsPipe } from './shared/pipes/bold-words.pipe';
import { SearchResultsComponent } from './subpages/branch/search-results/search-results.component';
import { PromotionBannerComponent } from './shared/components/promotion-banner/promotion-banner.component';
import { LoginModalComponent } from './auth/components/login-modal/login-modal.component';
import { SignupModalComponent } from './auth/components/signup-modal/signup-modal.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AddressPlaceholderComponent } from './address/components/address-placeholder/address-placeholder.component';
import { SearchInputComponent } from './search/components/search-input/search-input.component';
import { AddressListComponent } from './address/components/address-list/address-list.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { BranchProductListComponent } from './search/components/branch-product-list/branch-product-list.component';
import { SimpleProductComponent } from './search/components/simple-product/simple-product.component';
import { AllBranchProductSearchResultsComponent } from './pages/all-branch-product-search-results/all-branch-product-search-results.component';
import { BranchProductComponent } from './search/components/branch-product/branch-product.component';
import { OutOfStockComponent } from './shared/components/out-of-stock/out-of-stock.component';
import { AuthMobileNavBarComponent } from './shared/components/auth-mobile-nav-bar/auth-mobile-nav-bar.component';
import { InStockComponent } from './shared/components/in-stock/in-stock.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    NavBarContianerComponent,
    DesktopNavBarComponent,
    MobileNavBarComponent,
    StoreTileComponent,
    CountryTileComponent,
    BranchComponent,
    ShopMainComponent,
    BuyAgainComponent,
    BranchMobileNavBarComponent,
    BranchDesktopNavBarComponent,
    BranchNavBarContainerComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductDetailModalComponent,
    PrimaryButtonComponent,
    ExtraProductListComponent,
    BranchCartComponent,
    BranchCartListComponent,
    BranchCartItemmComponent,
    BranchCheckoutComponent,
    CheckoutComponent,
    LogoNavbarComponent,
    CheckoutFormComponent,
    CheckoutPriceSummaryComponent,
    DeliveryTimesDatesComponent,
    SalesComponent,
    CategoryComponent,
    SubCategoryComponent,
    ExpandedProductListComponent,
    BranchSidebarComponent,
    MainSidebarComponent,
    AccountComponent,
    OrdersComponent,
    AccountSidebarComponent,
    ProfileComponent,
    AddressesComponent,
    PaymentMethodsComponent,
    ProfileContactsComponent,
    ProfileReferralComponent,
    AddressEditPanelComponent,
    PaymentMethodPlaceholderComponent,
    OngoingTabComponent,
    OrderItemComponent,
    PastTabComponent,
    AddressEditModalComponent,
    AddressEditFormComponent,
    CartIconComponent,
    BurgerIconComponent,
    ShopNowCardComponent,
    SearchResultsPanelComponent,
    SearchResultsModalComponent,
    SubscriptionCardComponent,
    BoldWordsPipe,
    SearchResultsComponent,
    PromotionBannerComponent,
    LoginModalComponent,
    SignupModalComponent,
    AddressPlaceholderComponent,
    SearchInputComponent,
    AddressListComponent,
    OrderCompleteComponent,
    BranchProductListComponent,
    SimpleProductComponent,
    AllBranchProductSearchResultsComponent,
    BranchProductComponent,
    OutOfStockComponent,
    AuthMobileNavBarComponent,
    InStockComponent,
  ],
    imports: [
        BrowserModule,

        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        HttpClientModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({logOnly: environment.production}),
        StoreModule.forRoot(appReducer, {metaReducers}),

        PersistStateModule.forRoot<typeof appReducer>({
            states: [
                {
                    key: 'branch',
                    storage: localStorageStrategy,
                    runGuard: () => typeof window !== 'undefined',
                    source: (state: any) => state,
                    migrations: [],
                    skip: 1
                },
                  {
                    key: 'auth',
                    storage: localStorageStrategy,
                    runGuard: () => typeof window !== 'undefined',
                    source: (state: any) => state
                    ,
                    migrations: [],
                    skip: 1
                },
                {
                    key: 'cart',
                    storage: localStorageStrategy,
                    runGuard: () => typeof window !== 'undefined',
                    source: (state: any) => state,
                    migrations: [],
                    skip: 1
                },
            ],
            // optional rehydration strategy
            strategy: BeforeAppInit, // or AfterAppInit
        }),
        MatCheckboxModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
