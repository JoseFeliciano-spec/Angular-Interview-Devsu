import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputCustomComponent } from '../../components/input-custom/input-custom.component';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import {
  iProductResponse,
  Product,
} from '@/app/domain/models/Products/Products';

@Component({
  selector: 'app-home-list-products',
  standalone: true,
  imports: [InputCustomComponent],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css',
})

export class HomeListProductsComponent implements OnInit {
  constructor(private _getProductsCases: GetProductsCase) {}
  response$: Observable<iProductResponse> | undefined;
  datos: Product[] | undefined;
  title = 'Response';
  ngOnInit(): void {
    this.response$ = this._getProductsCases.getAllProducts();
    this.response$.subscribe((data: iProductResponse) => {
      this.datos = data.data;
    });
  }
}
