import {
  iProductResponse,
  iProductCreateResponse,
  Product,
} from '@/app/domain/models/Products/Products';
import { ProductGateway } from '@/app/domain/models/Products/gateway/product-gateway';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends ProductGateway {
  constructor(private http: HttpClient) {
    super();
  }

  getAllProducts(): Observable<iProductResponse> {
    return this.http.get<iProductResponse>('/api/bp/products');
  }

  getIdProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/bp/products/verification/${id}`);
  }

  createProduct(product: Product): Observable<iProductCreateResponse> {
    return this.http.post<iProductCreateResponse>('/api/bp/products', product);
  }
}
