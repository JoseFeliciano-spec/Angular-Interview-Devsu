import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import {
  iProductResponse,
  Product,
} from '@/app/domain/models/Products/Products';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputCustomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
