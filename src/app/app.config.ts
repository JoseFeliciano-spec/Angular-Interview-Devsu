import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ProductGateway } from './domain/models/Products/gateway/product-gateway';
import { ProductsApiService } from './infraestructure/driver-adapter/products-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: ProductGateway, useClass: ProductsApiService },
  ],
};
