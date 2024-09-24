import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-country-tile',
  templateUrl: './country-tile.component.html',
  styleUrls: ['./country-tile.component.css']
})
export class CountryTileComponent implements OnInit {
  @Input() image: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
