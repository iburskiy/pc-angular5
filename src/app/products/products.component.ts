// this eslint-disable to import json directly with "!json" that eslint doesn't like
/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import data from '../../assets/notebook';
import { Product } from '../entities/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor() { }

  ngOnInit() {
    console.log('data:', data);
    this.products = data.productList;
  }

}
