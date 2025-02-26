import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Rating,
  Box,
  IconButton,
  Pagination,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../redux';
import { fetchFavorites, removeFromFavorite } from '../redux/favorites/favoriteSlice';
import { addToCart } from '../redux/carts/cartSlice';
import { setIsLoading } from '../redux/favorites/favoriteSlice';
import { FavoriteResponse } from '../redux/favorites/type';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';
import LoadingScreen from '../components/Common/Loading';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorite.favorites_for_screen);
  const isLoading = useSelector((state: RootState) => state.favorite.isLoading);
  const user_id = useSelector((state: RootState) => state.user.user?.id);
  const total = useSelector((state: RootState) => state.favorite.total);
  const per_page = useSelector((state: RootState) => state.favorite.per_page);
  const current_page = useSelector((state: RootState) => state.favorite.current_page);

  useEffect(() => {
    if (user_id) {
      dispatch(setIsLoading(true));
      dispatch(fetchFavorites({user_id: user_id, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}))
        .unwrap()
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, []);

  const handleRemoveFromFavorites = (favoriteId: number) => {
    if (user_id) {
      dispatch(removeFromFavorite({
        favorite_id: favoriteId
      }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavorites({user_id: user_id, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
        });
    }
  };

  const handleAddToCart = (product_id: number) => {
    if (user_id) {
      dispatch(addToCart({
        user_id: user_id,
        product_id: product_id,
        quantity: 1
      }));
      // tmp メッセージを表示
    }
  };

  const navigateToProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    // dispatch(fetchProducts({ page: newPage, page_size: DEFAULT_PAGE_SIZE }));
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading favorites..." />
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            My Favorites
          </Typography>

          {favorites.length > 0 ? (
            <Grid container spacing={3}>
              {favorites.map((favorite: FavoriteResponse) => (
                <Grid item xs={12} sm={6} md={4} key={favorite.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`/api/product/${favorite.product.id}/image`}
                      alt={`Product ${favorite.product.id}`}
                      sx={{
                        objectFit: 'contain',
                        p: 2,
                        bgcolor: 'background.paper',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigateToProduct(favorite.product.id)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'primary.main' }
                        }}
                        onClick={() => navigateToProduct(favorite.product.id)}
                      >
                        Product {favorite.product.id}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => handleAddToCart(favorite.product.id)}
                        size="small"
                      >
                        Add to Cart
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveFromFavorites(favorite.id)}
                        size="small"
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              {/* Pagination */}
              <Grid container justifyContent="center" alignItems="center" mt={4}>
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                  count={Math.ceil(total / per_page)}
                  page={current_page}
                  onChange={handlePageChange}
                  color="primary"
                  />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{
              textAlign: 'center',
              py: 8,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Your favorites list is empty
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Box>
          )}
        </Container>
      )}
    </>
  );
};

export default FavoritesPage;
