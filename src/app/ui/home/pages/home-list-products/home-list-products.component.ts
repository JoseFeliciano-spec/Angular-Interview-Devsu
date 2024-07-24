import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { Router } from '@angular/router';
import { ProductsStore } from '@/app/ui/store/products.store';

@Component({
  selector: 'app-home-list-products',
  standalone: true,
  imports: [InputCustomComponent, ButtonCustomComponent],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css',
})
export class HomeListProductsComponent implements OnInit {
  readonly productStore = inject(ProductsStore);
  constructor(private router: Router) {}

  onClickButton = () => {
    this.router.navigateByUrl('/crear-producto');
  };

  ngOnInit(): void {
    console.log(this.productStore.productsList());
  }
}
