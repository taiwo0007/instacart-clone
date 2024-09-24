import { Component, OnInit } from '@angular/core';
import {UiServiceService} from "../../../shared/services/ui-service.service";

@Component({
  selector: 'app-search-results-modal',
  templateUrl: './search-results-modal.component.html',
  styleUrls: ['./search-results-modal.component.css']
})
export class SearchResultsModalComponent implements OnInit {

  constructor(private uiService:UiServiceService) { }

  ngOnInit(): void {
  }

  closeSearchModal() {
    this.uiService.isSearchModalOpen.next(false)
  }
}
