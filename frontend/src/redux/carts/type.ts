export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartState {
  carts: Cart[];
  carts_for_screen: CartResponse[];
  cart: Cart | null;
  total: number;
  per_page: number;
  current_page: number;
}

export interface CartResponse {
  id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number,
    name: string,
    price: number,
    stock: number,
    image: string,
  };
  total_price: number;
}
