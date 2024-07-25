import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsStore } from '@/app/ui/store/products.store';
import { JsonPipe } from '@angular/common';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { ActionPopperComponent } from '@/app/ui/home/components/action-popper/action-popper.component';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import { ModalComponent } from '@/app/ui/home/components/modal/modal.component';
import { Product } from '@/app/domain/models/Products/Products';

@Component({
  selector: 'app-home-list-products',
  standalone: true,
  imports: [
    InputCustomComponent,
    ButtonCustomComponent,
    ModalComponent,
    ActionPopperComponent,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css',
})
export class HomeListProductsComponent {
  readonly productStore = inject(ProductsStore);
  /* Pagination */
  pageSize: number = 5; // Cantidad de elementos por página
  currentPage: number = 1; // Página actual

  get totalPages() {
    return Math.ceil(this.productStore.productsList().length / this.pageSize);
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.productStore
      .productsList()
      .filter(this.onSortList(this.form.get('search')?.value))
      .slice(startIndex, startIndex + this.pageSize);
  }

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  };

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  };

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private router: Router,
    private productServices: GetProductsCase
  ) {}

  form = new FormGroup({
    search: new FormControl(''),
    changePageSizes: new FormControl('5'),
  });

  modalIsOpen = false;

  openModal() {
    this.modalIsOpen = true;
  }

  closeModal = () => {
    this.modalIsOpen = false;
  };

  onClickButton = () => {
    this.router.navigateByUrl('/crear-producto');
  };

  onOpenRemoveId = (item: Product) => {
    this.productStore.setValueProduct(item);
    this.openModal();
  };

  onSubmitDelete = () => {
    if (!this.productStore.productIndividual()?.id) {
      alert('No disponible id');
      this.closeModal();
      return;
    }
    this.productServices
      .deleteProduct(this.productStore.productIndividual()?.id ?? '')
      .subscribe((data) => {
        this.productStore.loadProducts(null);
        this.closeModal();
        alert(data?.message);
      });
  };

  onSubmitUpdate = (item: Product) => {
    this.productStore.setValueProduct(item);
    this.router.navigateByUrl('/actualizar-producto');
  };

  onChangePageSizeSelect = () => {
    this.pageSize = Number(this.form.get('changePageSizes')?.value) ?? 5;
  };

  onSortList = (term: any) => {
    return function (x: Product) {
      return (
        x.name.includes(term) ||
        x.logo.includes(term) ||
        x.description.includes(term) ||
        x.date_release.includes(term) ||
        x.date_revision.includes(term)
      );
    };
  };
}
