import { Routes } from '@angular/router';
import { HomeListProductsComponent } from '@/app/ui/home/pages/home-list-products/home-list-products.component';
import { ProductFormComponent } from './ui/home/pages/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeListProductsComponent,
  },
  {
    path: 'crear-producto',
    component: ProductFormComponent,
  },
  {
    path: 'actualizar-producto',
    component: ProductFormComponent,
  },
];
