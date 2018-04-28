// this eslint-disable to import json directly with "!json" that eslint doesn't like
/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import data from '../../assets/notebook';
import Product from '../entities/product';
import {FilteringService} from '../filtering.service';
import Filter from '../entities/filter';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  filters: Filter[] = [];

  constructor(private filteringService: FilteringService) {}

  ngOnInit() {
    this.products = data.productList;
    // making copy of product to have all products each time before filtering
    const copyProducts = Array.from(this.products);
    this.filteringService.filterProducts$.subscribe((filterData) => {
      this.handleFilters(filterData);
      this.products = this.filterProducts(copyProducts, this.filters);
    });
  }

  handleFilters(filterData) {
    const existingFilter = getFilter(this.filters, filterData);
    if (filterData['checked']) {
      addFilter(this.filters, existingFilter, filterData);
    } else {
      this.filters = removeFilter(this.filters, existingFilter, filterData);
    }

    function getFilter(filters, currentFilter) {
      if (!filters.length) {
        return null;
      }
      return filters.find(item => {
        return item['name'] === currentFilter['filterName'];
      });
    }

    function addFilter(filters, existingFilter, filterData) {
      const name = filterData.filterName;
      const value = filterData.filterValue;
      if (existingFilter) {
        if (!existingFilter.values.has(value)) {
          existingFilter.values.add(value);
        }
      } else {
        existingFilter = new Filter(name, new Set<string>().add(value));
        filters.push(existingFilter);
      }
    }

    function removeFilter(filters, existingFilter, filterData) {
      const value = filterData.filterValue;
      existingFilter.values.delete(value);
      if (!existingFilter.values.size) {
        filters = filters.filter((item) => {
          return item['name'] !== existingFilter['name'];
        });
      }
      return filters;
    }
  }

  filterProducts(products, filters) {
    if (!filters.length) {
      products = data.productList;
    } else {
      filters.forEach((filter) => {
        products = products.filter((product) => {
          return filter.values.has(product[filter.name]);
        });
      });
    }
    return products;
  }
}
