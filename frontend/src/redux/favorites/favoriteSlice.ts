import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite, FavoriteResponse, FavoriteState } from "./type";
import axios from "axios";
// import type { AxiosError } from "axios";
import { ApiPaginationResponse, ApiResponse } from "../../types/responses/Api";
import { api } from "../../constants/axios";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/constants";

const initialState: FavoriteState = {
  favorites: [],
  favorites_for_screen: [],
  favorite: null,
  isLoading: false,
  total: 0,
  per_page: DEFAULT_PAGE_SIZE,
  current_page: DEFAULT_PAGE,
};

export const fetchFavorites = createAsyncThunk<ApiPaginationResponse<FavoriteResponse>,{user_id: number, page: number, page_size: number}>(
  "favorite/getFavorites",
  async ({ user_id, page, page_size }) => {
    const response = await api.get<ApiPaginationResponse<FavoriteResponse>>(`/favorite/fetch-favorites`, {params: {user_id, page, page_size}});
    return response.data;
  }
);

export const fetchFavoritesForGuest = createAsyncThunk<ApiPaginationResponse<FavoriteResponse>,{page: number, page_size: number}>(
  "favorite/getFavoritesForGuest",
  async ({ page, page_size }) => {
    const response = await api.get<ApiPaginationResponse<FavoriteResponse>>(`/favorite/guest`, {params: {page, page_size}});
    return response.data;
  }
);

export const addToFavorite = createAsyncThunk<ApiResponse<Favorite>, {user_id: number, product_id: number}>('favorite/addToFavorite', async (favoriteData) => {
    const response = await api.post<ApiResponse<Favorite>>(`/favorite`, favoriteData);
    return response.data;
});

export const addToFavoriteForGuest = createAsyncThunk<ApiResponse<Favorite>, {product_id: number}>('favorite/addToFavoriteForGuest', async (favoriteData) => {
    const response = await api.post<ApiResponse<Favorite>>(`/favorite/guest`, favoriteData);
    return response.data;
});

export const removeFromFavorite = createAsyncThunk<ApiResponse<Favorite>, {favorite_id: number}>('favorite/removeFromFavorite', async (favoriteData) => {
    const response = await api.delete<ApiResponse<Favorite>>(`/favorite/${favoriteData.favorite_id}`);
    return response.data;
});

export const integrateFavorite = createAsyncThunk<ApiResponse<Favorite>, {user_id: number}>('favorite/integrateFavorite', async (favoriteData) => {
    const response = await api.post<ApiResponse<Favorite>>(`/favorite/integrate`, {user_id: favoriteData.user_id});
    return response.data;
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page) {
          state.favorites_for_screen = action.payload.data;
          state.favorites = action.payload.data.map((favorite: FavoriteResponse) => ({
            id: favorite.id,
            user_id: 0,
            product_id: favorite.product.id,
            created_at: favorite.created_at,
            updated_at: favorite.updated_at,
          }));
          state.total = action.payload.total;
          state.per_page = action.payload.per_page;
          state.current_page = action.payload.current_page;
        }
      })
      .addCase(fetchFavoritesForGuest.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.total && action.payload.per_page && action.payload.current_page) {
          state.favorites_for_screen = action.payload.data;
          state.favorites = action.payload.data.map((favorite: FavoriteResponse) => ({
            id: favorite.id,
            user_id: 0,
            product_id: favorite.product.id,
            created_at: favorite.created_at,
            updated_at: favorite.updated_at,
          }));
        }
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.favorites.push(action.payload.data);
        }
      })
      .addCase(addToFavoriteForGuest.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.favorites.push(action.payload.data);
        }
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.favorites_for_screen = state.favorites_for_screen.filter(fav => fav.id !== action.payload.data?.id);
          state.favorites = state.favorites.filter(fav => fav.id !== action.payload.data?.id);
        }
      })
      .addCase(integrateFavorite.fulfilled, (state, action) => {})
  },
});

// export const { setFavorite } = favoriteSlice.actions;
export const { setIsLoading } = favoriteSlice.actions;
export default favoriteSlice.reducer;
