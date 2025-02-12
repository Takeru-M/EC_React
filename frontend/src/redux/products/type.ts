import Pagination from "../../types/responses/Pagination";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: {
    rate: number;
    count: number;
  };
  categories: {
    id: number;
    name: string;
  }[];
}

export interface Products {
  products: Pagination<Product>;
}

export interface ProductState {
  products: Pagination<Product>;
  product: Product | null;
};

export type Action = {
  type: string;
  payload: any;
};
