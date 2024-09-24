import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-auth-mobile-nav-bar',
  templateUrl: './auth-mobile-nav-bar.component.html',
  styleUrls: ['./auth-mobile-nav-bar.component.css']
})
export class AuthMobileNavBarComponent {
openSignUpModal() {
  this.uiService.isSignUpOpen.next({isOpen: true, isClosable: true});
}

openLoginModal() {
  this.uiService.isLoginOpen.next({isOpen: true, isClosable: true});
}


  constructor(private uiService: UiServiceService) { }

  openMainSideBar(): void {

    this.uiService.isMainSideBarOpen.next(true)
  }


}
