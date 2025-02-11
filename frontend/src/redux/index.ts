import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import productReducer from "./products/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
