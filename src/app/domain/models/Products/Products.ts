export interface iProductResponse {
  data: Product[];
}

export interface iProductCreateResponse {
  data: Product[];
  message: string;
}

export class Product {
  id!: string;
  name!: string;
  description!: string;
  logo!: string;
  date_release!: string;
  date_revision!: string;
}
