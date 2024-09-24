import {HostListener, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Product} from "../../product/models/product.interface";

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  isBranchBarOpen = new BehaviorSubject(false);
  isMobile$ = new BehaviorSubject<boolean>(false);
  isProductDetailOpen$ = new BehaviorSubject<boolean>(false);
  isBranchCartOpen = new BehaviorSubject<boolean>(false);
  isMainSideBarOpen = new BehaviorSubject<boolean>(false);
  isAddressModalOpened = new BehaviorSubject<boolean>(false);
  isSearchPanelOpen = new BehaviorSubject<boolean>(false);
  isSearchModalOpen = new BehaviorSubject<boolean>(false);
  isLoginOpen = new BehaviorSubject<{isOpen:boolean, isClosable:boolean}>({isOpen: false, isClosable: false});
  isSignUpOpen = new BehaviorSubject<{isOpen:boolean, isClosable:boolean}>({isOpen: false, isClosable: false});
  placeOrder = new BehaviorSubject<boolean>(false)

  selectedProductSource$ = new BehaviorSubject<any>(null)
  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    this.isMobile$.next(window.innerWidth <= 768);
  }
}
