import {Component, Input, OnInit} from '@angular/core';
import {StoresService} from "../../home/services/stores.service";
import {Store} from "../../home/models/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stores:Store[] = []

  constructor(private storeService: StoresService) {}

  ngOnInit(): void {
    this.storeService.fetchStores().subscribe((data:Store[]) => {
      this.stores = data;
      console.log(this.stores)
    })
  }

}
