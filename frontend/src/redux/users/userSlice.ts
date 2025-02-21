import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Signout, User, UserState } from "./type";
import { API_URL } from "../../constants/constants";
import axios from 'axios';
import { ApiResponse } from "../../types/responses/Api";
import { Auth, Signin } from "./type";
import { api, api_initial } from "../../constants/axios";

const initialState: UserState = {
  users: [],
  user: null,
  isSignin: false,
};

// tmp パスを変える
export const signup = createAsyncThunk<ApiResponse<User>, {formData: Auth}>('user/signup', async ({formData}) => {
  await api_initial.get("/sanctum/csrf-cookie");
  const response = await api.post<ApiResponse<User>>(`/signup`, formData);
  return response.data;
});

export const signin = createAsyncThunk<ApiResponse<User>, {formData: Signin}>('user/signin', async ({formData}) => {
  await api_initial.get("/sanctum/csrf-cookie");
  const response = await api.post<ApiResponse<User>>(`/signin`, formData);
  return response.data;
});

export const signout = createAsyncThunk<void>('user/signout', async () => {
  const response = await api.post<void>(`/signout`);
  return response.data;
});

export const fetchUser = createAsyncThunk<ApiResponse<User>>('user/fetchUser', async () => {
  try {
    const response = await api.get<ApiResponse<User>>(`/fetch_user`);
    return response.data;
  } catch {
    return null;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data;
          if (action.payload.data.id) {
            state.isSignin = true;
          }
        }
      })
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data;
          if (action.payload.data.id) {
            state.isSignin = true;
          }
        }
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.isSignin = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data;
          state.isSignin = true;
        } else {
          state.user = null;
          state.isSignin = false;
        }
      })
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
