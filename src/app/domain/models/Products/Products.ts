export interface iProductResponse {
  data: Product[];
}

export class Product {
  id!: string;
  name!: string;
  description!: string;
  logo!: string;
  data_release!: string;
  date_revision!: string;
}
