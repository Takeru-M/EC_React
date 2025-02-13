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
  products: Product[];
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  current_page: number;
  per_page: number;
};

export type Action = {
  type: string;
  payload: any;
};
