import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";
import axios from 'axios';
import { ProductState, Product } from "./type";
import Pagination from "../../types/responses/Pagination";

const initialState: ProductState = {
  products: {
    data: [],
    // total: 0,
    // per_page: DEFAULT_PAGE_SIZE,
    // current_page: DEFAULT_PAGE,
  },
  product: null,
};

export const fetchProducts = createAsyncThunk<Pagination<Product>>('product/fetchProducts', async () => {
  const response = await axios.get<Pagination<Product>>(`${API_URL}/product`);
  return response.data;
});

export const fetchProduct = createAsyncThunk<Product, {id: number}>('product/fetchProduct', async ({id}) => {
  const response = await axios.get<Product>(`${API_URL}/product/${id}`);
  return response.data;
});

export const registerProduct = createAsyncThunk<Product, Partial<Product>>('product/register',
  async (productData) => {
    const response = await axios.post<Product>(`${API_URL}/product`, productData);
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
        state.products = action.payload;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(registerProduct.fulfilled, (state, action) => {
        state.products.data.push(action.payload);
      });
  }
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
