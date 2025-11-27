import { User } from "../users/type";

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  order_date: string;
  total_price: number;
}

export interface OrderTablePayloadForGuest {
  id: number;
  name: string;
  postal_code: number;
  email: string;
  phone_number: number;
}

export interface OrderState {
  orders: Order[];
  order: Order | null;
  isLoading: boolean;
  total: number;
  per_page: number;
  current_page: number;
}

export interface OrderTablePayload {
  user?: User;
  guest?: OrderTablePayloadForGuest;
  address: string;
  shipping_fee: number;
  total_price: number;
  status: number;
}

export interface OrderItemsPayload {
  order_id: number;
  products: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface OrderPayload {
  order: OrderTablePayload;
  orderedItems: OrderItemsPayload;
}
