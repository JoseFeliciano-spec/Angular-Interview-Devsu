import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductFormComponent } from './product-form.component';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { ProductsStore } from '@/app/ui/store/products.store';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import { of } from 'rxjs';
import {
  Product,
  iProductCreateResponse,
} from '@/app/domain/models/Products/Products';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productsStoreMock: jasmine.SpyObj<any>;
  let getProductsCaseMock: jasmine.SpyObj<GetProductsCase>;

  beforeEach(async () => {
    productsStoreMock = jasmine.createSpyObj('ProductsStore', [
      'loadProducts',
      'setValueProduct',
      'productIndividual',
    ]);
    getProductsCaseMock = jasmine.createSpyObj('GetProductsCase', [
      'createProduct',
      'updateProduct',
      'getIdProduct',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ProductFormComponent,
        InputCustomComponent,
        ButtonCustomComponent,
      ],
      providers: [
        { provide: ProductsStore, useValue: productsStoreMock },
        { provide: GetProductsCase, useValue: getProductsCaseMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.get('id')).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('description')).toBeTruthy();
    expect(component.form.get('logo')).toBeTruthy();
    expect(component.form.get('date_release')).toBeTruthy();
    expect(component.form.get('date_revision')).toBeTruthy();
  });

  it('should call createProduct on submit when not in update mode', () => {
    const mockProduct: Product = {
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-07-25',
      date_revision: '2025-07-25',
    };
    component.form.patchValue(mockProduct);
    const mockResponse: iProductCreateResponse = {
      data: [mockProduct],
      message: 'Product created successfully',
    };
    getProductsCaseMock.createProduct.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(getProductsCaseMock.createProduct).toHaveBeenCalledWith(
      jasmine.objectContaining(mockProduct)
    );
    expect(productsStoreMock.loadProducts).toHaveBeenCalledWith(null);
  });

  it('should call updateProduct on submit when in update mode', () => {
    component.formUpdateActive = true;
    const mockProduct: Product = {
      id: '123',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'updated-logo.png',
      date_release: '2024-07-25',
      date_revision: '2025-07-25',
    };
    component.form.patchValue(mockProduct);
    const mockResponse: iProductCreateResponse = {
      data: [mockProduct],
      message: 'Product updated successfully',
    };
    getProductsCaseMock.updateProduct.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(getProductsCaseMock.updateProduct).toHaveBeenCalledWith(
      jasmine.objectContaining(mockProduct)
    );
    expect(productsStoreMock.setValueProduct).toHaveBeenCalledWith(undefined);
    expect(productsStoreMock.loadProducts).toHaveBeenCalledWith(null);
  });

  it('should check for ID uniqueness on blur', () => {
    const mockId = '123';
    component.form.get('id')?.setValue(mockId);
    getProductsCaseMock.getIdProduct.and.returnValue(of(false));

    component.onBlur();

    expect(getProductsCaseMock.getIdProduct).toHaveBeenCalledWith(mockId);
    expect(component.notRepeatId).toBeFalse();
  });

  it('should update date_revision when date_release changes', () => {
    const mockDate = '2024-07-25';
    component.form.get('date_release')?.setValue(mockDate);

    component.onBlurChangeDateRevision();

    const expectedRevisionDate = '2025-07-25';
    expect(component.form.get('date_revision')?.value).toBe(
      expectedRevisionDate
    );
  });
});
