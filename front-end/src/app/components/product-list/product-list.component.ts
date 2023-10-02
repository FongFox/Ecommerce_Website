import { Product } from 'src/app/common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listProducts();
  }

  listProducts() {
    this.ProductService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
