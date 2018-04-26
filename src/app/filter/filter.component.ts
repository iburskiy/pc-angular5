import { Component, Input, OnInit } from '@angular/core';
import data from '../../assets/notebook';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterName: string;

  filterValues: string[] = [];

  constructor() { }

  ngOnInit() {
    data.productList.forEach((item) => {
      if (!this.filterValues.includes(item[this.filterName])) {
        this.filterValues.push(item[this.filterName]);
      }
    });
  }

}
