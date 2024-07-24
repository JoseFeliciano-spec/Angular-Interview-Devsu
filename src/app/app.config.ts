import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductGateway } from '@/app/domain/models/Products/gateway/product-gateway';
import { ProductsApiService } from '@/app/infraestructure/driver-adapter/products-api.service';
import { ProductsStore } from '@/app/ui/store/products.store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: ProductGateway, useClass: ProductsApiService },
    ProductsStore,
  ],
};
