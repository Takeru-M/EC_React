// import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../css/Home.module.css';
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import ProductItem from '../components/Home/Product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../redux/products/productSlice';
import type { AppDispatch, RootState } from '../redux';
import { Product } from '../redux/products/type';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/product';

const SearchedProducts = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.product.products);
  const total = useSelector((state: RootState) => state.product.total);
  const per_page = useSelector((state: RootState) => state.product.per_page);
  const current_page = useSelector((state: RootState) => state.product.current_page);

  useEffect(() => {
    const searchTerm = searchParams.get('q') || '';
    const categoryId = searchParams.get('category_id') || '';
    dispatch(searchProducts({
        searchTerm: searchTerm,
        category_id: Number(categoryId),
        page: current_page,
        page_size: per_page
    }));
  }, [searchParams]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    // dispatch(fetchProducts({ page: newPage, page_size: DEFAULT_PAGE_SIZE }));
  };

  const gotoProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  }

  return (
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
  );
};

export default SearchedProducts;
