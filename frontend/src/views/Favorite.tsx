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
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../redux';
import { fetchFavorites, removeFromFavorite } from '../redux/favorites/favoriteSlice';
import { addToCart } from '../redux/carts/cartSlice';
import { Favorite } from '../redux/favorites/type';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const isLoading = useSelector((state: RootState) => state.favorite.isLoading);
  // const user_id = useSelector((state: RootState) => state.user.user?.id);

  const user_id = 1;
  useEffect(() => {
    if (user_id) {
      dispatch(fetchFavorites({user_id: user_id}));
    }
  }, []);

  const handleRemoveFromFavorites = async (favorite: Favorite) => {
    if (user_id) {
      await dispatch(removeFromFavorite({
        user_id: user_id,
        product_id: favorite.product_id
      }));
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (user_id) {
      await dispatch(addToCart({
        user_id: user_id,
        product_id: productId,
        quantity: 1
      }));
    }
  };

  const navigateToProduct = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Favorites
      </Typography>

      {favorites.length === 0 ? (
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
      ) : (
        <Grid container spacing={3}>
          {favorites.map((favorite: Favorite) => (
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
                  image={`/api/products/${favorite.product_id}/image`}
                  alt={`Product ${favorite.product_id}`}
                  sx={{
                    objectFit: 'contain',
                    p: 2,
                    bgcolor: 'background.paper',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigateToProduct(favorite.product_id)}
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
                    onClick={() => navigateToProduct(favorite.product_id)}
                  >
                    Product {favorite.product_id}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(favorite.product_id)}
                    size="small"
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromFavorites(favorite)}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
