import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { JsonPipe } from '@angular/common';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { ProductsStore } from '@/app/ui/store/products.store';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    InputCustomComponent,
    ButtonCustomComponent,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  readonly productStore = inject(ProductsStore);
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit = () => {
    console.log(this.form);
  };

  onClick = () => {
    this.router.navigateByUrl('');
  };

  /* onChange = (e: any): void => {
    console.log(e);
    let dict = {};
    if (this.productStore.formProducts) {
      dict = { ...this.productStore.formProducts() };
    }

    this.productStore.setValue('formProducts', {
      ...dict,
      [e.target.name]: { value: e.target.value },
    });
  }; */
}
