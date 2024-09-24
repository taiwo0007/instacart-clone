import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-branch-nav-bar-container',
  templateUrl: './branch-nav-bar-container.component.html',
  styleUrls: ['./branch-nav-bar-container.component.css']
})
export class BranchNavBarContainerComponent implements OnInit {
  isMobile: boolean = window.innerWidth <= 768;


  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    this.isMobile = window.innerWidth <= 768
  }

  ngOnInit(): void {
  }

  toggleBurgerBarHandler(event: boolean) {

    console.log(event)

  }
}
