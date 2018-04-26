import { Component, OnInit } from '@angular/core';
import data from '../../assets/notebook';
import { ActivatedRoute } from '@angular/router';
import ProductDetail from '../entities/product-detail';
import Product from '../entities/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  productDetails: ProductDetail[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const href = this.route.snapshot.paramMap.get('href');
    this.product = data.productList.find(item => item.href === href);
    const productLabels = data.productListLabels;

    Object.keys(this.product).forEach((attr) => {
      if (productLabels[attr]) {
        this.productDetails.push({ label: productLabels[attr], value: this.product[attr] });
      }
    });
  }

}
