// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import Login from './views/Login';
import Home from './views/Home';
import Product from './views/Product';
// import Cart from './views/Cart'
import Header from './components/Header/Header';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux';
import { fetchUser } from './redux/users/userSlice';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      dispatch(fetchUser({id: Number(userId)}));
    }
  }, [dispatch]);

  useEffect(() => {
    // バックエンドからカートの中身の個数を取得してストアに入れる
  }, []);

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
