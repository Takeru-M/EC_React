import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";
import axios from 'axios';
import { ProductState, Product } from "./type";
import Pagination from "../../types/responses/Pagination";
import { ApiResponse } from "../../types/responses/Api";

const initialState: ProductState = {
  products: {
    data: [],
    // total: 0,
    // per_page: DEFAULT_PAGE_SIZE,
    // current_page: DEFAULT_PAGE,
  },
  product: null,
};

export const fetchProducts = createAsyncThunk<ApiResponse<Pagination<Product>>, {page: number, page_size: number}>('product/fetchProducts', async ({page, page_size}) => {
  const response = await axios.get<ApiResponse<Pagination<Product>>>(`${API_URL}/product`, {params: {page, page_size}});
  return response.data;
});

export const fetchProduct = createAsyncThunk<ApiResponse<Product>, {id: number}>('product/fetchProduct', async ({id}) => {
  const response = await axios.get<ApiResponse<Product>>(`${API_URL}/product/${id}`);
  return response.data;
});

export const registerProduct = createAsyncThunk<ApiResponse<Product>, Partial<Product>>('product/register',
  async (productData) => {
    const response = await axios.post<ApiResponse<Product>>(`${API_URL}/product`, productData);
    return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.products = action.payload.data;
        }
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.product = action.payload.data;
        }
      })
      .addCase(registerProduct.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.products.data.push(action.payload.data);
        }
      });
  }
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
