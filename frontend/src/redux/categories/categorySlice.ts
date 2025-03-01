import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState } from "./type";
import { api } from "../../constants/axios";
import { ApiResponse } from "../../types/responses/Api";
import { Category } from "./type";

const initialState: CategoryState = {
  categories: [],
  selectedCategory: 0,
};

export const fetchCategories = createAsyncThunk<ApiResponse<Category[]>, void>('category/fetchCategories', async () => {
  const response = await api.get<ApiResponse<Category[]>>('/category');
  return response.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.categories = action.payload.data;
        }
      });
  }
})

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
