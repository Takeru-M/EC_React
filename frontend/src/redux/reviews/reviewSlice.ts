import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { ApiPaginationResponse, ApiResponse } from "../../types/responses/Api";
import { FetchedReviewResponse, ReviewState, Review } from "./type";
import { DEFAULT_PAGE } from "../../constants/constants";
import { DEFAULT_REVIEW_PAGE_SIZE } from "../../constants/review";

const initialState: ReviewState = {
  reviews: [],
  reviews_for_display: [],
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_REVIEW_PAGE_SIZE,
};

export const getReviews = createAsyncThunk<ApiPaginationResponse<FetchedReviewResponse>, {product_id: number}>('review/getList', async ({product_id}) => {
  const response = await axios.get<ApiPaginationResponse<FetchedReviewResponse>>(`${API_URL}/review/get_list`, {params: {product_id}});
  return response.data;
});

export const getReviewsWithUserNames = createAsyncThunk<ApiPaginationResponse<FetchedReviewResponse>, {product_id: number}>('review/getReviewsWithUserNames', async ({product_id}) => {
  const response = await axios.get<ApiPaginationResponse<FetchedReviewResponse>>(`${API_URL}/review/get_reviews_with_user_names`, {params: {product_id}});
  return response.data;
});

export const createReview = createAsyncThunk<ApiResponse<Review>, {user_id: number, product_id: number, rating: number, comment: string}>('review/create', async ({user_id, product_id, rating, comment}) => {
  const response = await axios.post<ApiResponse<Review>>(`${API_URL}/review`, {user_id, product_id, rating, comment});
  return response.data;
});

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.reviews = action.payload.data;
        }
      })
      .addCase(getReviewsWithUserNames.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.reviews_for_display = action.payload.data;
        }
      });
  }
});

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
