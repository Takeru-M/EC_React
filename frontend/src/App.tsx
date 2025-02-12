// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux';
import Login from './views/Login';
import Home from './views/Home';
import Product from './views/Product';
// import Cart from './views/Cart'
import Header from './components/Header/Header';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from './redux';
import { fetchUser } from './redux/users/userSlice';
import { fetchCarts } from './redux/carts/cartSlice';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // const userId = localStorage.getItem('user_id');
    const userId = 1;
    if (userId) {
      dispatch(fetchUser({id: Number(userId)}));
    }
  }, [dispatch]);

  const user_id = useSelector((state: RootState) => state.user.user?.id);

  useEffect(() => {
    if (user_id) {
      dispatch(fetchCarts({user_id: user_id}));
    }
  }, [user_id, dispatch]);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/users/:action" element={<Login />} />
          {/* <Route path="/cart/:id" element={<Cart />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
