import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState, UpdateUserState } from "./type";
import { ApiResponse } from "../../types/responses/Api";
import { Auth, Signin } from "./type";
import { api, api_initial } from "../../constants/axios";
import { Address } from "./type";

const initialState: UserState = {
  users: [],
  user: null,
  isSignin: false,
  address: null,
  addresses: [],
  isLoading: false,
};

export const signup = createAsyncThunk<ApiResponse<User>, {formData: Auth}>('user/signup', async ({formData}, {rejectWithValue}) => {
  try {
    await api_initial.get("/sanctum/csrf-cookie");
    const response = await api.post<ApiResponse<User>>(`/signup`, formData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Authentication failed';
    return rejectWithValue(errorMessage);
  }
});

export const signin = createAsyncThunk<ApiResponse<User>, {formData: Signin}>('user/signin', async ({formData}, {rejectWithValue}) => {
  try {
    await api_initial.get("/sanctum/csrf-cookie");
    const response = await api.post<ApiResponse<User>>(`/signin`, formData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Authentication failed';
    return rejectWithValue(errorMessage);
  }
});

export const signout = createAsyncThunk<void>('user/signout', async () => {
  await api.post<void>(`/signout`);
});

export const fetchUser = createAsyncThunk<ApiResponse<User> | null, void>(
  'user/fetchUser',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get<ApiResponse<User>>('/fetch-user');
      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const createGuestUser = createAsyncThunk<ApiResponse<number>, void>(
  'user/createGuestUser', async () => {
  const response = await api.post<ApiResponse<number>>(`/guest-user`);
  return response.data;
});

export const updateUser = createAsyncThunk<ApiResponse<User>, {id: number, formData: UpdateUserState}>(
  'user/updateUser', async ({id, formData}) => {
  const response = await api.put<ApiResponse<User>>(`/user/${id}`, formData);
  return response.data;
});

export const fetchAddresses = createAsyncThunk<ApiResponse<Address[]>, {id: number}>(
  'user/fetchAddresses', async ({id}) => {
  const response = await api.get<ApiResponse<Address[]>>(`/user/address/`, {params: {id}});
  return response.data;
});

export const createAddress = createAsyncThunk<ApiResponse<Address>, {formData: Address}>(
  'user/createAddress', async ({formData}) => {
  const response = await api.post<ApiResponse<Address>>(`/user/address`, formData);
  return response.data;
});

export const updateAddress = createAsyncThunk<ApiResponse<Address>, {formData: Address}>(
  'user/updateAddress', async ({formData}) => {
  const response = await api.put<ApiResponse<Address>>(`/user/address`, formData);
  return response.data;
});

export const deleteAddress = createAsyncThunk<ApiResponse<Address>, {id: number}>(
  'user/deleteAddress', async ({id}) => {
  const response = await api.delete<ApiResponse<Address>>(`/user/address/`, {params: {id}});
  return response.data;
});

export const switchDefaultAddress = createAsyncThunk<ApiResponse<Address>, {id: number, is_default: boolean}>(
  'user/switchDefaultAddress', async ({id, is_default}) => {
  const response = await api.put<ApiResponse<Address>>(`/user/address/default`, {id, is_default});
  return response.data;
});

export const updatePassword = createAsyncThunk<void, {id: number, current_password: string, new_password: string}>(
  'user/updatePassword', async ({id, current_password, new_password}) => {
  const response = await api.put<void>(`/user/password/${id}`, {current_password, new_password});
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
    setDefaultAddress: (state, action: PayloadAction<{id: number, is_default: boolean}>) => {
      const address = state.addresses.find(addr => addr.id === action.payload.id);
      if (address) {
        address.is_default = action.payload.is_default;
        state.address = address;
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
      .addCase(signin.rejected, (state) => {
        state.user = null;
        state.isSignin = false;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.isSignin = false;
      })
      .addCase(createGuestUser.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.guest_id = action.payload.data;
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.data) {
            state.user = action.payload.data;
            state.isSignin = true;
          }
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.payload) {
          state.user = null;
          state.isSignin = false;
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data;
        }
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.addresses = action.payload.data;
        }
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.addresses.push(action.payload.data);
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.address = action.payload.data;
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.addresses = state.addresses.filter((address) => address.id !== action.payload.data.id);
        }
      })
      .addCase(switchDefaultAddress.fulfilled, (state, action) => {
        // if (action.payload.data) {
        //   state.address = action.payload.data;
        // }
      })
      .addCase(updatePassword.fulfilled, () => {})
      // .addCase(updatePassword.rejected, (state, action) => {
      //   state.error = action.payload || 'An error occurred';

      //   // エラーメッセージをユーザーに通知
      //   toast.error(action.payload || 'Failed to update password');
      // });
  },
});

export const { setUser, setIsLoading, setDefaultAddress } = userSlice.actions;

export default userSlice.reducer;
