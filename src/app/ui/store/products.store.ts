import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Product } from '@/app/domain/models/Products/Products';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';

interface IProductsState {
  products: Product[];
  status: 'Loading' | 'Loaded' | 'Error';
  formProducts?: {
    id?: { value: string; error: string | null };
    name?: { value: string; error: string | null };
    description?: { value: string; error: string | null };
    logo?: { value: string; error: string | null };
  };
}

const initialState: IProductsState = {
  products: [],
  status: 'Loading',
  formProducts: {},
};

export const ProductsStore = signalStore(
  withState(initialState),
  withComputed(({ products }) => ({
    productsList: computed(() => products()),
  })),
  withMethods((store, productService = inject(GetProductsCase)) => ({
    loadProducts: rxMethod(
      pipe(
        tap(() => patchState(store, { status: 'Loading' })),
        switchMap(() => {
          return productService.getAllProducts().pipe(
            tap((products) => {
              patchState(store, {
                products: products.data,
                status: 'Loaded',
              });
            })
          );
        })
      )
    ),
    setValue: (index: 'formProducts' | 'status' | 'products', value: any) =>
      patchState(store, { [index]: value }),
  }))
);
