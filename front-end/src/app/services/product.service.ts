import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/products';
  private categoryURL = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate( thePage:number,
                          thePageSize:number,
                          theCategoryId: number): Observable<GetResponseProducts> {
    // build URL based on category id, page & size
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchURL);
  }

  //Return product data from back-end
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchURL);
  }

  searchproducts(theKeyWord: string): Observable<Product[]>{
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyWord}`;

    return this.getProducts(searchURL);
  }

  searchproductsPaginate( thePage:number,
                          thePageSize:number,
                          theKeyWord: string): Observable<GetResponseProducts> {
    // build URL based on category id, page & size
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyWord}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchURL);
  }

  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(theProductId: number): Observable<Product>{
    //build URL base on product-id :v
    const productURL = `${this.baseURL}/${theProductId}`;
    return this.httpClient.get<Product>(productURL);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number, //size of this page
    totalElements: number, //grand total of ALL elements in db
    totalPages: number, //total pages available
    number: number //current page number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
