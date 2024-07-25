import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsStore } from '@/app/ui/store/products.store';
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
  ],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css',
})
export class HomeListProductsComponent {
  readonly productStore = inject(ProductsStore);
  constructor(
    private router: Router,
    private productServices: GetProductsCase
  ) {}

  form = new FormGroup({
    search: new FormControl(''),
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
}
