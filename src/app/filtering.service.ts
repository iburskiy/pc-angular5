import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilteringService {

  private _filterProducts = new Subject();

  filterProducts$ = this._filterProducts.asObservable();

  constructor() { }

  filterProducts(checked, filterName, filterValue) {
    const params = {checked, filterName, filterValue};
    this._filterProducts.next(params);
  }

}
