import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";
import axios from 'axios';
import { ProductState, Product } from "./type";
import { ApiResponse, ApiPaginationResponse } from "../../types/responses/Api";
import { api } from "../../constants/axios";

const initialState: ProductState = {
  products: [],
  product: null,
  total: 0,
  per_page: DEFAULT_PAGE_SIZE,
  current_page: DEFAULT_PAGE,
  isLoading: false,
};

export const fetchProducts = createAsyncThunk<ApiPaginationResponse<Product>, {page: number, page_size: number}>('product/fetchProducts', async ({page, page_size}) => {
  const response = await api.get<ApiPaginationResponse<Product>>(`/product`, {params: {page, page_size}});
  return response.data;
});

export const fetchProduct = createAsyncThunk<ApiResponse<Product>, {id: number}>('product/fetchProduct', async ({id}) => {
  const response = await api.get<ApiResponse<Product>>(`/product/${id}`);
  return response.data;
});

export const registerProduct = createAsyncThunk<ApiResponse<Product>, Partial<Product>>('product/register',
  async (productData) => {
    const response = await api.post<ApiResponse<Product>>(`/product`, productData);
    return response.data;
});

export const searchProducts = createAsyncThunk<ApiPaginationResponse<Product>, {searchTerm: string, category_id: number, page: number, page_size: number}>('product/searchProducts', async ({searchTerm, category_id, page, page_size}) => {
  const response = await api.get<ApiPaginationResponse<Product>>(`/search`, {params: {searchTerm, category_id, page, page_size}});
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        product: action.payload,
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page ) {
          state.products = action.payload.data;
          state.total = action.payload.total;
          state.per_page = action.payload.per_page;
          state.current_page = action.payload.current_page;
        }
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.product = action.payload.data;
        }
      })
      .addCase(registerProduct.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.products.push(action.payload.data);
        }
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page ) {
          state.products = action.payload.data;
          state.total = action.payload.total;
          state.per_page = action.payload.per_page;
          state.current_page = action.payload.current_page;
        }
      });
  }
});

export const { setProduct, setIsLoading } = productSlice.actions;

export default productSlice.reducer;
