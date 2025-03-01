import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartState } from "./type";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { ApiPaginationResponse, ApiResponse } from "../../types/responses/Api";
import { CartResponse } from "./type";
import { api } from "../../constants/axios";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";

const initialState: CartState = {
  carts: [],
  carts_for_screen: [],
  cart: null,
  total: 0,
  per_page: DEFAULT_PAGE_SIZE,
  current_page: DEFAULT_PAGE,
  isLoading: false,
};

// export const getCarts = createAsyncThunk<ApiResponse<Cart[]>, {user_id: number}>('cart/getCarts', async ({user_id}) => {
//   const response = await api.get<ApiResponse<Cart[]>>(`/cart/${user_id}`);
//   return response.data;
// });

export const fetchCarts = createAsyncThunk<ApiPaginationResponse<CartResponse>, {user_id: number, page: number, page_size: number}>('cart/fetchCarts', async ({user_id, page, page_size}) => {
  const response = await api.get<ApiPaginationResponse<CartResponse>>(`/cart/fetch-carts`, {params: {user_id, page, page_size}});
  return response.data;
});

export const fetchCartsForGuest = createAsyncThunk<ApiPaginationResponse<CartResponse>, {page: number, page_size: number}>('cart/fetchCartsForGuest', async ({page, page_size}) => {
  const response = await api.get<ApiPaginationResponse<CartResponse>>(`/cart/guest`, {params: {page, page_size}});
  return response.data;
});

export const addToCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number, product_id: number, quantity: number}>('cart/addToCart', async (cartData) => {
  const response = await api.post<ApiResponse<Cart>>(`/cart`, cartData);
  return response.data;
});

export const addToCartForGuest = createAsyncThunk<ApiResponse<Cart>, {product_id: number, quantity: number}>('cart/addToCartForGuest', async (cartData) => {
  const response = await api.post<ApiResponse<Cart>>(`/cart/guest`, cartData);
  return response.data;
});

export const removeFromCart = createAsyncThunk<ApiResponse<Cart>, {cart_id: number}>('cart/removeFromCart', async (cartData) => {
  const response = await api.delete<ApiResponse<Cart>>(`/cart/${cartData.cart_id}`);
  return response.data;
});

export const updateQuantity = createAsyncThunk<ApiResponse<Cart>, {cart_id: number, quantity: number}>('cart/updateQuantity', async (cartData) => {
  const response = await api.put<ApiResponse<Cart>>(`/cart/${cartData.cart_id}`, {quantity: cartData.quantity});
  return response.data;
});

export const integrateCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number}>('cart/integrateCart', async (cartData) => {
  const response = await api.post<ApiResponse<Cart>>(`/cart/integrate`, {user_id: cartData.user_id});
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearCart: (state) => {
      state.carts = [];
      state.carts_for_screen = [];
      state.cart = null;
      state.total = 0;
      state.per_page = DEFAULT_PAGE_SIZE;
      state.current_page = DEFAULT_PAGE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page) {
          state.carts_for_screen = action.payload.data;
          state.carts = action.payload.data.map((cart: CartResponse) => ({
            id: cart.id,
            user_id: 0,
            product_id: cart.product.id,
            quantity: cart.quantity,
            created_at: cart.created_at,
            updated_at: cart.updated_at,
          }));

          state.total = action.payload.total;
          state.per_page = action.payload.per_page;
          state.current_page = action.payload.current_page;
        }
      })
      .addCase(fetchCartsForGuest.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page) {
          state.carts_for_screen = action.payload.data;
          state.carts = action.payload.data.map((cart: CartResponse) => ({
            id: cart.id,
            user_id: 0,
            product_id: cart.product.id,
            quantity: cart.quantity,
            created_at: cart.created_at,
            updated_at: cart.updated_at,
          }));

          state.total = action.payload.total;
          state.per_page = action.payload.per_page;
          state.current_page = action.payload.current_page;
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts.push(action.payload.data);
        }
      })
      .addCase(addToCartForGuest.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts.push(action.payload.data);
        }
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        if (action.payload.data) {
          const cart = state.carts_for_screen.find(cart => cart.id === action.payload.data?.id);
          if (cart) {
            cart.quantity = action.payload.data?.quantity;
            cart.total_price = cart.product.price * cart.quantity;
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts_for_screen = state.carts_for_screen.filter(cart => cart.id !== action.payload.data?.id);
          state.carts = state.carts.filter(cart => cart.id !== action.payload.data?.id);
        }
      })
      .addCase(integrateCart.fulfilled, (state, action) => {})
  }
});

// export const { updateCartQuantity } = cartSlice.actions;
export const { setIsLoading, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
