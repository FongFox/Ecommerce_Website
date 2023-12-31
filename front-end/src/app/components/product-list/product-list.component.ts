import { ActivatedRoute, Routes } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  previousKeyWord: string = "";

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProduct();
    }
  }

  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    // if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyWord != theKeyWord) {
      this.thePageNumber = 1;
    }

    this.previousKeyWord = theKeyWord;
    console.log(`keyword = ${theKeyWord}, thePageNumber = ${this.thePageNumber}`);

    //
    //search product for product using keyword
    this.ProductService.searchproductsPaginate( this.thePageNumber - 1,
                                                this.thePageSize,
                                                theKeyWord).subscribe(this.processResult());
  }

  handleListProduct() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param String, convert to string to number (by using "+" symbol)
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      //not category id available ... default to "undefine"
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // check if having different category than previous
    // Note: angular will reuse a component if it is currently being viewed
    //

    //if having a different category id than previous
    //then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    //get the products for the given category id
    this.ProductService.getProductListPaginate( this.thePageNumber - 1,
                                                this.thePageSize, this.currentCategoryId)
                                              .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return(data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product) {
    console.log(`Add to Cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
