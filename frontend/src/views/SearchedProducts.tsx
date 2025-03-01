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
import LoadingScreen from '../components/Common/Loading';
import { setIsLoading } from '../redux/products/productSlice';

const SearchedProducts = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.product.products);
  const total = useSelector((state: RootState) => state.product.total);
  const per_page = useSelector((state: RootState) => state.product.per_page);
  const current_page = useSelector((state: RootState) => state.product.current_page);
  const categories = useSelector((state: RootState) => state.category.categories);
  const isLoading = useSelector((state: RootState) => state.product.isLoading);
  const searchTerm = searchParams.get('q') || '';
  const categoryId = searchParams.get('category_id') || '';
  const category = categories.find((category) => category.id === Number(categoryId));

  useEffect(() => {
    dispatch(searchProducts({
      searchTerm: searchTerm,
      category_id: Number(categoryId),
      page: current_page,
      page_size: per_page
    }))
    .unwrap()
    .finally(() => {
      dispatch(setIsLoading(false));
    });
  }, [searchParams]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(searchProducts({
      searchTerm: searchTerm,
      category_id: Number(categoryId),
      page: newPage,
      page_size: per_page
    }));
  };

  const gotoProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading products..." />
        ) : (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* タイトル */}
            <Typography variant="h4" component="h1" gutterBottom>
          {t('search.results')}
        </Typography>

        {/* カテゴリ表示 */}
        {categoryId ? (
          <Typography variant="subtitle1">
            {t('search.category')}: {category?.name || t('search.none')}
          </Typography>
        ) : <></>}

        {/* 検索結果件数 */}
        {total > 0 ? (
          <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
            {
              `${1 + (current_page - 1) * per_page}
              -${total < current_page * per_page ? total : current_page * per_page} of 
              ${total} ${searchTerm ? `for "${searchTerm}"` : ''}`
            }
          </Typography>
        ) : (
          <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
            {t('search.no_result')}
          </Typography>
        )}

        {/* 商品一覧 */}
        <Box sx={{ flexGrow: 1 }} className={styles.home_container}>
          <Grid container spacing={3}>
            {products?.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={3} onClick={() => gotoProduct(product)}>
                <ProductItem product={product}/>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ページネーション */}
        {total > per_page && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(total / per_page)}
              page={current_page}
              onChange={handlePageChange}
              color="primary"
            />
            </Box>
          )}
        </Container>
      )}
    </>
  );
};

export default SearchedProducts;
