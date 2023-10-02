import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  //Return product data from back-end
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseURL).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
