import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import productReducer from "./products/productSlice";
import cartReducer from "./carts/cartSlice";
import favoriteReducer from "./favorites/favoriteSlice";
import reviewReducer from "./reviews/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
