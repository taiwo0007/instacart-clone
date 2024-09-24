import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";
import {Product} from "../../../product/models/product.interface";
import {setProductDetail} from "../../../branch/store/branch.actions";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-search-results-panel',
  templateUrl: './search-results-panel.component.html',
  styleUrls: ['./search-results-panel.component.css']
})
export class SearchResultsPanelComponent implements OnInit {

  @Input() results: Product[] | null | undefined;
  @Input() isMainSearchInput: boolean = false;
  @Output() pickResult = new EventEmitter<string>();

  constructor(
    private uiService:UiServiceService,
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  closeSearchPanel(){
    this.uiService.isSearchPanelOpen.next(false)
  }


  openProductDetail(product: Product) {

    this.closeSearchPanel()

    console.log(product);
    this.uiService.selectedProductSource$.next(product);
    this.store.dispatch(setProductDetail({product}));

    this.uiService.isProductDetailOpen$.next(true);

  }


  updateSelectedInput(name: any) {

    this.pickResult.emit(name)

  }
}
