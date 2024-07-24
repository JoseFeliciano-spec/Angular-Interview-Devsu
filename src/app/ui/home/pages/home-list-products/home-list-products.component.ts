import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import {
  iProductResponse,
  Product,
} from '@/app/domain/models/Products/Products';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-list-products',
  standalone: true,
  imports: [InputCustomComponent, ButtonCustomComponent],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css',
})
export class HomeListProductsComponent implements OnInit {
  constructor(
    private _getProductsCases: GetProductsCase,
    private router: Router
  ) {}
  response$: Observable<iProductResponse> | undefined;
  datos: Product[] | undefined;

  onClickButton = () => {
    this.router.navigateByUrl('/crear-producto');
  };

  ngOnInit(): void {
    this.response$ = this._getProductsCases.getAllProducts();
    this.response$.subscribe((data: iProductResponse) => {
      this.datos = data.data;
    });
  }
}
