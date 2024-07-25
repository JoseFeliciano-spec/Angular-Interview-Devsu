import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeListProductsComponent } from './home-list-products.component';
import { ProductsStore } from '@/app/ui/store/products.store';
import { GetProductsCase } from '@/app/domain/usecases/get-products-use-case';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { ActionPopperComponent } from '@/app/ui/home/components/action-popper/action-popper.component';
import { ModalComponent } from '@/app/ui/home/components/modal/modal.component';
import { of } from 'rxjs';
import { Product } from '@/app/domain/models/Products/Products';

describe('HomeListProductsComponent', () => {
  let component: HomeListProductsComponent;
  let fixture: ComponentFixture<HomeListProductsComponent>;
  let productsStoreMock: jasmine.SpyObj<any>;
  let getProductsCaseMock: jasmine.SpyObj<GetProductsCase>;

  beforeEach(async () => {
    productsStoreMock = jasmine.createSpyObj('ProductsStore', [
      'productsList',
      'setValueProduct',
      'productIndividual',
      'loadProducts',
    ]);
    getProductsCaseMock = jasmine.createSpyObj('GetProductsCase', [
      'deleteProduct',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HomeListProductsComponent,
        InputCustomComponent,
        ButtonCustomComponent,
        ActionPopperComponent,
        ModalComponent,
      ],
      providers: [
        { provide: ProductsStore, useValue: productsStoreMock },
        { provide: GetProductsCase, useValue: getProductsCaseMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    const mockProducts: Product[] = new Array(15).fill({} as Product);
    productsStoreMock.productsList.and.returnValue(mockProducts);
    component.pageSize = 5;

    expect(component.totalPages).toBe(3);
  });

  it('should paginate items correctly', () => {
    const mockProducts: Product[] = new Array(15)
      .fill({} as Product)
      .map((_, index) => ({
        id: `${index}`,
        name: `Product ${index}`,
        description: `Description ${index}`,
        logo: `logo${index}.png`,
        date_release: '2024-07-25',
        date_revision: '2025-07-25',
      }));
    productsStoreMock.productsList.and.returnValue(mockProducts);
    component.pageSize = 5;
    component.currentPage = 2;

    expect(component.paginatedItems.length).toBe(5);
    expect(component.paginatedItems[0].id).toBe('5');
  });

  it('should change page correctly', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);

    component.nextPage();
    expect(component.currentPage).toBe(2);

    component.onPageChange(3);
    expect(component.currentPage).toBe(3);
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.modalIsOpen).toBeTrue();

    component.closeModal();
    expect(component.modalIsOpen).toBeFalse();
  });

  it('should set product for removal', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-07-25',
      date_revision: '2025-07-25',
    };
    component.onOpenRemoveId(mockProduct);
    expect(productsStoreMock.setValueProduct).toHaveBeenCalledWith(mockProduct);
    expect(component.modalIsOpen).toBeTrue();
  });

  it('should delete product', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-07-25',
      date_revision: '2025-07-25',
    };
    productsStoreMock.productIndividual.and.returnValue(mockProduct);
    getProductsCaseMock.deleteProduct.and.returnValue(
      of({ message: 'Product deleted' })
    );

    component.onSubmitDelete();

    expect(getProductsCaseMock.deleteProduct).toHaveBeenCalledWith('1');
    expect(productsStoreMock.loadProducts).toHaveBeenCalledWith(null);
    expect(component.modalIsOpen).toBeFalse();
  });

  it('should update page size', () => {
    component.form.get('changePageSizes')?.setValue('10');
    component.onChangePageSizeSelect();
    expect(component.pageSize).toBe(10);
  });

  it('should filter products correctly', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product A',
        description: 'Desc A',
        logo: 'logoA.png',
        date_release: '2024-07-25',
        date_revision: '2025-07-25',
      },
      {
        id: '2',
        name: 'Product B',
        description: 'Desc B',
        logo: 'logoB.png',
        date_release: '2024-07-26',
        date_revision: '2025-07-26',
      },
    ];
    productsStoreMock.productsList.and.returnValue(mockProducts);
    component.form.get('search')?.setValue('A');

    expect(component.paginatedItems.length).toBe(1);
    expect(component.paginatedItems[0].name).toBe('Product A');
  });
});
