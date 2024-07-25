import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductsStore } from '@/app/ui/store/products.store';
import { RouterTestingModule } from '@angular/router/testing';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let productsStoreMock: jasmine.SpyObj<any>;

  beforeEach(async () => {
    productsStoreMock = jasmine.createSpyObj('ProductsStore', ['loadProducts']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, InputCustomComponent],
      providers: [{ provide: ProductsStore, useValue: productsStoreMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts with null on init', () => {
    fixture.detectChanges(); // This triggers ngOnInit
    expect(productsStoreMock.loadProducts).toHaveBeenCalledWith(null);
  });
});
