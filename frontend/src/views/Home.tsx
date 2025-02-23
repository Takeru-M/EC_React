// import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Home.module.css';
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import ProductItem from '../components/Home/Product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setIsLoading } from '../redux/products/productSlice';
import type { AppDispatch, RootState } from '../redux';
import { Product } from '../redux/products/type';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/product';
import { fetchCarts } from '../redux/carts/cartSlice';
import LoadingScreen from '../components/Common/Loading';

const Home = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.product.products);
  const total = useSelector((state: RootState) => state.product.total);
  const per_page = useSelector((state: RootState) => state.product.per_page);
  const current_page = useSelector((state: RootState) => state.product.current_page);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.product.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(fetchProducts({page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}))
      .unwrap()
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCarts({user_id: user.id, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    }
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    // dispatch(fetchProducts({ page: newPage, page_size: DEFAULT_PAGE_SIZE }));
  };

  const gotoProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading products..." />
      ) : (
        products ? (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
          {t('home.home_title')}
        </Typography>
        <Box sx={{ flexGrow: 1 }} className={styles.home_container}>
          <Grid container spacing={3}>
            {products?.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={3} onClick={() => gotoProduct(product)}>
                <ProductItem product={product}/>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(total / per_page)}
            page={current_page}
            onChange={handlePageChange}
            color="primary"
          />
          </Box>
          </Container>
        ) : (
          <LoadingScreen message="Loading products..." />
        )
      )}
    </>
  );
};

export default Home;
