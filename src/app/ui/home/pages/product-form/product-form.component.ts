import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { ProductsStore } from '@/app/ui/store/products.store';
import { unstructuredErrors } from '@/app/ui/utils/unstructuredErrors';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';

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
  response!: Observable<boolean>;
  notRepeatId: boolean = false;

  form: FormGroup = new FormGroup({
    id: new FormControl(
      '',
      Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(3),
        Validators.required,
      ])
    ),
    name: new FormControl(
      '',
      Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(5),
        Validators.required,
      ])
    ),
    description: new FormControl(
      '',
      Validators.compose([
        Validators.maxLength(200),
        Validators.minLength(10),
        Validators.required,
      ])
    ),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl(dayjs().format('YYYY-MM-DD'), [
      Validators.required,
    ]),
    date_revision: new FormControl(dayjs().format('YYYY-MM-DD')),
  });

  constructor(
    private router: Router,
    private productServices: GetProductsCase
  ) {}

  get errorsId(): string {
    if (this.notRepeatId === true) {
      return 'Este ID es inválido';
    }
    const variablesError: any = {
      minlength: 'El valor mínimo debe de ser de 3 caracteres',
      maxlength: 'El valor máximo es de 10 caracteres',
      required: 'Este campo es requerido',
    };

    return unstructuredErrors({ variablesError, form: this.form, key: 'id' });
  }

  get errorsName() {
    const variablesError: any = {
      minlength: 'El valor mínimo debe de ser de 5 caracteres',
      maxlength: 'El valor máximo es de 100 caracteres',
      required: 'Este campo es requerido',
    };
    return unstructuredErrors({ variablesError, form: this.form, key: 'name' });
  }

  get errorsDescription() {
    const variablesError: any = {
      minlength: 'El valor mínimo debe de ser de 10 caracteres',
      maxlength: 'El valor máximo es de 200 caracteres',
      required: 'Este campo es requerido',
    };
    return unstructuredErrors({
      variablesError,
      form: this.form,
      key: 'description',
    });
  }

  get errorsLogo() {
    const variablesError: any = {
      required: 'Este campo es requerido',
    };
    return unstructuredErrors({
      variablesError,
      form: this.form,
      key: 'logo',
    });
  }

  get errorsDateRelease() {
    const variablesError: any = {
      required: 'Este campo es requerido',
    };
    return unstructuredErrors({
      variablesError,
      form: this.form,
      key: 'date_release',
    });
  }

  onSubmit = () => {
    this.productServices.createProduct(this.form.value).subscribe((data) => {
      alert(data?.message);
      this.form.reset();
      this.productStore.loadProducts(null);
    });
  };

  onBlur = () => {
    this.response = this.productServices.getIdProduct(
      this.form.get('id')?.value
    );

    this.response.subscribe((data) => {
      this.notRepeatId = data;
    });
  };

  onReset = () => {
    this.form.reset();
  };

  onClick = () => {
    this.router.navigateByUrl('');
  };
}
