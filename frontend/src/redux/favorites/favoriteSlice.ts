import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite, FavoriteState } from "./type";
import axios from "axios";
// import type { AxiosError } from "axios";
import { API_URL } from "../../constants/constants";
import { ApiResponse } from "../../types/responses/Api";

const initialState: FavoriteState = {
  favorites: [],
  favorite: null,
};

export const fetchFavorites = createAsyncThunk<ApiResponse<Favorite[]>,{ user_id: number }>(
  "favorite/fetchFavorites",
  async ({ user_id }) => {
    const response = await axios.get<ApiResponse<Favorite[]>>(`${API_URL}/favorite/${user_id}`);
    return response.data;
  }
);

export const addToFavorite = createAsyncThunk<ApiResponse<Favorite>, {user_id: number, product_id: number}>('favorite/addToFavorite', async (favoriteData) => {
    const response = await axios.post<ApiResponse<Favorite>>(`${API_URL}/favorite`, favoriteData);
    return response.data;
});

export const removeFromFavorite = createAsyncThunk<ApiResponse<Favorite>, {user_id: number, product_id: number}>('favorite/removeFromFavorite', async (favoriteData) => {
    const response = await axios.delete<ApiResponse<Favorite>>(`${API_URL}/favorite/`, {params: favoriteData});
    return response.data;
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.favorites = action.payload.data;
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
export default favoriteSlice.reducer;
