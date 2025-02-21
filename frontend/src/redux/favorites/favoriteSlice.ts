import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite, FavoriteResponse, FavoriteState } from "./type";
import axios from "axios";
// import type { AxiosError } from "axios";
import { ApiResponse } from "../../types/responses/Api";
import { api } from "../../constants/axios";

const initialState: FavoriteState = {
  favorites: [],
  favorites_for_screen: [],
  favorite: null,
  isLoading: false,
};

export const getFavorites = createAsyncThunk<ApiResponse<FavoriteResponse[]>,{ user_id: number }>(
  "favorite/getFavorites",
  async ({ user_id }) => {
    const response = await api.get<ApiResponse<FavoriteResponse[]>>(`/favorite/get_favorites?user_id=${user_id}`);
    return response.data;
  }
);

export const addToFavorite = createAsyncThunk<ApiResponse<Favorite>, {user_id: number, product_id: number}>('favorite/addToFavorite', async (favoriteData) => {
    const response = await api.post<ApiResponse<Favorite>>(`/favorite`, favoriteData);
    return response.data;
});

export const removeFromFavorite = createAsyncThunk<ApiResponse<Favorite>, {favorite_id: number}>('favorite/removeFromFavorite', async (favoriteData) => {
    const response = await api.delete<ApiResponse<Favorite>>(`/favorite/${favoriteData.favorite_id}`);
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
      .addCase(getFavorites.fulfilled, (state, action) => {
        if (action.payload.data) {
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
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        if (action.payload.data) {
          // tmp
          state.favorites = state.favorites.filter(fav => fav.id !== action.payload.data?.id);
        }
      })
  },
});

// export const { setFavorite } = favoriteSlice.actions;
export const { setIsLoading } = favoriteSlice.actions;
export default favoriteSlice.reducer;
