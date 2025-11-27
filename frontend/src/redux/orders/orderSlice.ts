import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import type { AxiosError } from "axios";
import { ApiPaginationResponse, ApiResponse } from "../../types/responses/Api";
import { api } from "../../constants/axios";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";
import { OrderTablePayload, OrderItemsPayload, OrderState, Order, OrderPayload } from "./type";

const initialState: OrderState = {
  orders: [],
  order: null,
  isLoading: false,
  total: 0,
  per_page: DEFAULT_PAGE_SIZE,
  current_page: DEFAULT_PAGE,
};

export const handleOrder = createAsyncThunk('orders/handleOrder', async (order: OrderPayload) => {
  const response = await api.post<ApiResponse<Order>>('handle-order', order);
  return response.data;
});

// export const createOrder = createAsyncThunk('orders/createOrder', async (order: OrderTablePayload) => {
//   const response = await api.post<ApiResponse<Order>>('order', order);
//   return response.data;
// });

// export const createOrderItems = createAsyncThunk('orders/createOrderItems', async (orderItems: OrderItemsPayload) => {
//   const response = await api.post<ApiResponse<Order>>('ordered-item', orderItems);
//   return response.data;
// });

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleOrder.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.order = action.payload.data;
        }
      })
  },
});

export const { setIsLoading } = orderSlice.actions;

export default orderSlice.reducer;
