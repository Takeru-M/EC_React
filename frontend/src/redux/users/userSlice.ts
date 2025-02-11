import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginResponse, User, UserState, fetchUserResponse } from "./type";
import { API_URL } from "../../constants/constants";
import axios from 'axios';

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: false,
};

export const fetchUser = createAsyncThunk<User, {id: number}>('user/fetchuser', async ({id}) => {
  const response = await axios.get<User>(`${API_URL}/user/${id}`);
  return response.data;
});

export const doRegister = createAsyncThunk<loginResponse, {name: string, email: string, password: string}>('user/register', async ({name, email, password}) => {
  const response = await axios.post<loginResponse>(`${API_URL}/user`, {name, email, password});
  return response.data;
});

export const doLogin = createAsyncThunk<loginResponse, {email: string, password: string}>('user/login', async ({email, password}) => {
  const response = await axios.post<loginResponse>(`${API_URL}/user/login`, {email, password});
  return response.data;
});

export const doLogout = createAsyncThunk<void, {id: number}>('user/logout', async ({id}) => {
  const response = await axios.post<void>(`${API_URL}/user/logout`, {id});
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
      .addCase(doRegister.pending, (state) => {
        return {
          ...state,
          user: null,
          accessToken: null,
          loading: true,
        }
      })
      .addCase(doRegister.fulfilled, (state, action: PayloadAction<loginResponse>) => {
        if (action.payload.user?.id) {
          localStorage.setItem('user_id', action.payload.user.id.toString());
        }
        if (action.payload.access_token) {
          localStorage.setItem('access_token', action.payload.access_token);
        }
        return {
          ...state,
          user: action.payload.user,
          accessToken: action.payload.access_token,
          loading: false,
        }
      })
      .addCase(doRegister.rejected, (state) => {
        return {
          ...state,
          user: null,
          accessToken: null,
          loading: false,
        }
      })
      .addCase(doLogin.pending, (state) => {
        return {
          ...state,
          user: null,
          accessToken: null,
          loading: true,
        }
      })
      .addCase(doLogin.fulfilled, (state, action: PayloadAction<loginResponse>) => {
        if (action.payload.user) {
          localStorage.setItem('user_id', action.payload.user.id.toString());
        }
        if (action.payload.access_token) {
          localStorage.setItem('access_token', action.payload.access_token);
        }
        return {
          ...state,
          user: action.payload.user,
          accessToken: action.payload.access_token,
          loading: false,
        }
      })
      .addCase(doLogin.rejected, (state) => {
        return {
          ...state,
          user: null,
          accessToken: null,
          loading: false,
        }
      })
      .addCase(fetchUser.pending, (state) => {
        return {
          ...state,
          user: null,
          loading: true,
        }
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<fetchUserResponse>) => {
        return {
          ...state,
          user: action.payload.user,
          loading: false,
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        return {
          ...state,
          user: null,
          loading: false,
        }
      })
      .addCase(doLogout.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(doLogout.fulfilled, (state) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        return {
          ...state,
          user: null,
          accessToken: null,
          loading: false,
        }
      })
      .addCase(doLogout.rejected, (state) => {
        return {
          ...state,
          loading: false,
        }
      })
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
