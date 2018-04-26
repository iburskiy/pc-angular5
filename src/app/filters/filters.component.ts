import { Component, OnInit } from '@angular/core';
import data from '../../assets/notebook';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filterFields: String[];

  constructor() { }

  ngOnInit() {
    this.filterFields = data.filterFields;
  }

}
