import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState, UserResponse } from "./type";
import { API_URL } from "../../constants/constants";
import axios from 'axios';
import { ApiResponse } from "../../types/responses/Api";

const initialState: UserState = {
  user: null,
  accessToken: null,
};

// tmp パスを変える
export const doLogin = createAsyncThunk<UserResponse, {email: string, password: string}>('user/login', async ({email, password}) => {
  const response = await axios.post<UserResponse>(`${API_URL}/user/login`, {email, password});
  return response.data;
});

export const doLogout = createAsyncThunk<UserResponse, {id: number}>('user/logout', async ({id}) => {
  const response = await axios.post<UserResponse>(`${API_URL}/user/logout`, {id});
  return response.data;
});

export const fetchUser = createAsyncThunk<ApiResponse<User>, {id: number}>('user/fetchuser', async ({id}) => {
  const response = await axios.get<ApiResponse<User>>(`${API_URL}/user/${id}`);
  return response.data;
});

export const createUser = createAsyncThunk<UserResponse, {name: string, email: string, password: string}>('user/register', async ({name, email, password}) => {
  const response = await axios.post<UserResponse>(`${API_URL}/user`, {name, email, password});
  return response.data;
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
      .addCase(doLogin.fulfilled, (state, action) => {
        if (action.payload.access_token) {
          localStorage.setItem('access_token', action.payload.access_token);
        }
        return {
          ...state,
          user: action.payload.data,
          accessToken: action.payload.access_token,
        }
      })
      .addCase(doLogout.fulfilled, (state) => {
        localStorage.removeItem('access_token');
        return {
          ...state,
          user: null,
          accessToken: null,
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data;
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload.access_token) {
          localStorage.setItem('access_token', action.payload.access_token);
        }
        return {
          ...state,
          user: action.payload.data,
          accessToken: action.payload.access_token,
        }
      })
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;