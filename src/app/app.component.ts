import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { GetProductsCase } from './domain/usecases/get-products-use-case';
import { iProductResponse, Product } from './domain/models/Products/Products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
