// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux';
import Auth from './views/Auth';
import Home from './views/Home';
import Product from './views/Product';
import Favorite from './views/Favorite';
import Cart from './views/Cart'
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { useEffect } from 'react';
import { fetchUser } from './redux/users/userSlice';
import type { AppDispatch } from './redux';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Auth />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/product/:id" element={<Product />} />
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/account" element={<Account />} /> */}
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/cart/:id" element={<Cart />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
