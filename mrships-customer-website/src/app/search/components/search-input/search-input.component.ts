import { BranchCart } from './../../../cart/store/cart.state';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../../../product/services/product.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectBranchId } from 'src/app/branch/store/branch.selector';
import { Product } from 'src/app/product/models/product.interface';
import { AppState } from 'src/app/store/app.reducer';
import {debounceTime,exhaustMap} from 'rxjs'
import { BranchProduct } from '../../models/branch-product.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit{
  isSearchPanelOpen:boolean | undefined = false;
  @Input() isMainSearchInput:boolean = false;
  inputControl = new FormControl('');
  branchId: number | undefined;
  productResults: Product[] | null = []
  isMobile: boolean = window.innerWidth <= 768

  constructor(private store:Store<AppState>,
              private uiService:UiServiceService,
              private productService:ProductService,
              private router:Router,
              private route:ActivatedRoute
              
              ) {

  }

  ngOnInit(): void {

    if(!this.isMainSearchInput){

      this.initBranchInput();
    }
    else{
      this.initMainSearchInput();
    }
   

    this.uiService.isSearchPanelOpen.subscribe(data => {
      this.isSearchPanelOpen = data
    })

      
  }


  initMainSearchInput(){

    this.inputControl.valueChanges.pipe(
      debounceTime(300),
      exhaustMap(value => this.productService.searchBranchProductsBySearchTerm((value || "")))

    ).subscribe((data:BranchProduct[] ) => {

      console.log("data", data)

      this.productResults = ([] as Product[]).concat(...data.map(branchProduct => branchProduct.products));
    
      console.log("products", this.productResults)
    
    
    })

  }

  initBranchInput(){

     this.store.select(selectBranchId).subscribe((branchId: number) => {
      this.branchId = branchId
    })

    this.inputControl.valueChanges.pipe(
        debounceTime(300),
        exhaustMap(value => this.productService.searchProductBySearchTerm((value || "") , this.branchId))

      ).subscribe(data => {

        this.productResults = data
      })
  }

  onSubmit(event: Event): void {

    event.preventDefault();
    // Perform the action you want on form submit
    const searchTerm = this.inputControl.value;
    console.log(`Searching for: ${searchTerm}`);
    // You can call your API or perform other actions here

    const queryParams  = {
      searchTerm
    }
    this.uiService.isSearchPanelOpen.next(false)

    this.router.navigate([this.isMainSearchInput ? 'all-branch-products-search' : 'search-results'], {queryParams, relativeTo:this.route})
  
  }

  setSelectedResult(selectedResult: any) {

    console.log("selectedResult",selectedResult)

    this.inputControl.setValue(selectedResult)

  }

  onBlur(event: FocusEvent) {
    setTimeout(() => {
      this.closeSearchPanel();
    }, 150); // 150ms delay, you can adjust this value
  }

  openSearchPanel(){
    this.uiService.isSearchPanelOpen.next(true)
    
      }
      closeSearchPanel(){
        this.uiService.isSearchPanelOpen.next(false)
      }
  
}
