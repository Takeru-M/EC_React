export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  count: number;
  created_at: string;
  updated_at: string;
}

export interface CartState {
  carts: Cart[];
  cart: Cart | null;
}

export interface CommonState<T> {
  data: T[];
  
}
