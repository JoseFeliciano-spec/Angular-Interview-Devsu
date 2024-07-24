import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ProductsStore } from '@/app/ui/store/products.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputCustomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly productStore = inject(ProductsStore);

  ngOnInit(): void {
    this.productStore.loadProducts(null);
  }
}
