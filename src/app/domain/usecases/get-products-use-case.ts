import { Injectable } from '@angular/core';
import { ProductGateway } from '@/app/domain/models/Products/gateway/product-gateway';
import { Observable } from 'rxjs';
import {
  iProductResponse,
  Product,
  iProductCreateResponse,
} from '@/app/domain/models/Products/Products';

@Injectable({
  providedIn: 'root',
})
export class GetProductsCase {
  constructor(private _productGateway: ProductGateway) {}

  getAllProducts(): Observable<iProductResponse> {
    return this._productGateway.getAllProducts();
  }

  getIdProduct(id: string): Observable<boolean> {
    return this._productGateway.getIdProduct(id);
  }

  createProduct(product: Product): Observable<iProductCreateResponse> {
    return this._productGateway.createProduct(product);
  }
}
