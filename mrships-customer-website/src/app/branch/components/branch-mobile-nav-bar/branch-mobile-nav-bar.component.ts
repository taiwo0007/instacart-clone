import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import { AppState } from 'src/app/store/app.reducer';

import { selectStore } from '../../store/branch.selector';
import { Store as BranchStore } from 'src/app/home/models/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-branch-mobile-nav-bar',
  templateUrl: './branch-mobile-nav-bar.component.html',
  styleUrls: ['./branch-mobile-nav-bar.component.css']
})
export class BranchMobileNavBarComponent implements OnInit {

  @Output() toggleBurgerBar = new EventEmitter<boolean>();
  branchStore!:BranchStore;
  constructor(private uiService:UiServiceService, private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.select(selectStore)
    .subscribe((data:any) => {
      this.branchStore = data;
    })
  }

  onToggleBurgerBar(){

    this.uiService.isBranchBarOpen.next(true);

  }



  openMainSideBar(): void {

    this.uiService.isMainSideBarOpen.next(true)
  }

  openBranchCart() {
    this.uiService.isBranchCartOpen.next(true)
  }
}
