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
  product: Product | undefined;
}

const initialState: IProductsState = {
  products: [],
  status: 'Loading',
  product: undefined,
};

export const ProductsStore = signalStore(
  withState(initialState),
  withComputed(({ products, product }) => ({
    productsList: computed(() => products()),
    productIndividual: computed(() => product()),
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
    setValueProduct: (value: Product | undefined) => patchState(store, { product: value }),
  }))
);
