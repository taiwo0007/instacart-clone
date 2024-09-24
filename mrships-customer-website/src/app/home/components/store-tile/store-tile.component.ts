import {Component, Input, OnInit} from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {setStore, setStoreId} from "../../../branch/store/branch.actions";


@Component({
  selector: 'app-store-tile',
  templateUrl: './store-tile.component.html',
  styleUrls: ['./store-tile.component.css']
})
export class StoreTileComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() image: string | undefined;
  @Input() id: number | undefined;
  @Input() retrievedStore: any | undefined;
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
  }

  setStoreId() {
    if (this.id) {
      this.store.dispatch(setStoreId({id: this.id}))
      this.store.dispatch(setStore({store: this.retrievedStore}))
    }

  }
}
