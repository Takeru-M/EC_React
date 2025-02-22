import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryState } from "./type";
import { api } from "../../constants/axios";
import { ApiResponse } from "../../types/responses/Api";
import { Category } from "./type";

const initialState: CategoryState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk<ApiResponse<Category[]>, void>('category/fetchCategories', async () => {
  const response = await api.get<ApiResponse<Category[]>>('/category');
  return response.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
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

export default categorySlice.reducer;
