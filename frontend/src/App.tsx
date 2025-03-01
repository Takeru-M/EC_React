// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux';
import Auth from './views/Auth';
import Home from './views/Home';
import Product from './views/ProductDetail';
import SearchedProducts from './views/SearchedProducts';
import Account from './views/Account';
import Favorite from './views/Favorite';
import Cart from './views/Cart'
import Header from './components/Header/Header';
import Payment from './views/Payment';
import NotFound from './views/Common/NotFound';
import './App.css';
import { useEffect } from 'react';
import { fetchUser, createGuestUser } from './redux/users/userSlice';
import type { AppDispatch, RootState } from './redux';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchUser())
    .unwrap()
    .finally(() => {
      if (!user) {
        dispatch(createGuestUser());
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Auth />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/search" element={<SearchedProducts />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/order_history" element={<OrderHistory />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
