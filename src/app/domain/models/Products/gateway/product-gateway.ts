import { Observable } from 'rxjs';
import {
  iProductResponse,
  Product,
  iProductCreateResponse,
} from '@/app/domain/models/Products/Products';

export abstract class ProductGateway {
  abstract getAllProducts(): Observable<iProductResponse>;

  abstract getIdProduct(id: string): Observable<boolean>;

  abstract createProduct(product: Product): Observable<iProductCreateResponse>;
}
