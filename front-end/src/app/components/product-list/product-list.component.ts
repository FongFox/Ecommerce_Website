import { ActivatedRoute, Routes } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param String, convert to string to number (by using "+" symbol)
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //not category id available ... default to "undefine"
      this.currentCategoryId = 1;
    }

    this.ProductService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
