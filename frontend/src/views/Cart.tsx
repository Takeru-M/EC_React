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
  Box,
  IconButton,
  TextField,
  Paper,
  Divider,
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../redux';
import { CartResponse } from '../redux/carts/type';
import { fetchCarts, fetchCartsForGuest, removeFromCart, setIsLoading, updateQuantity } from '../redux/carts/cartSlice';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';
import LoadingScreen from '../components/Common/Loading';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector((state: RootState) => state.cart.carts_for_screen);
  const total = useSelector((state: RootState) => state.cart.total);
  const per_page = useSelector((state: RootState) => state.cart.per_page);
  const current_page = useSelector((state: RootState) => state.cart.current_page);
  const user_id = useSelector((state: RootState) => state.user.user?.id);
  const isLoading = useSelector((state: RootState) => state.cart.isLoading);

  useEffect(() => {
    if (user_id) {
      dispatch(setIsLoading(true));
      dispatch(fetchCarts({user_id: user_id, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}))
        .unwrap()
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setIsLoading(true));
      dispatch(fetchCartsForGuest({page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}))
        .unwrap()
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [user_id]);

  const handleRemoveFromCart = async (cart_id: number) => {
    await dispatch(removeFromCart({cart_id: cart_id}))
    if (user_id) {
      dispatch(fetchCarts({user_id: user_id as number, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    } else {
      dispatch(fetchCartsForGuest({page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    }
  };

  // TODO: Change the value in database after finishing actions(Efficiency)
  const handleQuantityChange = (cart_id: number, newQuantity: string) => {
    const quantity = Number(newQuantity);
    dispatch(updateQuantity({
      cart_id: cart_id,
      quantity: quantity
    }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    if (user_id) {
      dispatch(fetchCarts({user_id: user_id, page: newPage, page_size: DEFAULT_PAGE_SIZE}));
    } else {
      dispatch(fetchCartsForGuest({page: newPage, page_size: DEFAULT_PAGE_SIZE}));
    }
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const total_price = carts.reduce((total, cart) => total + (cart.total_price), 0);

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading cart..." />
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            Shopping Cart
          </Typography>

          {carts.length > 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {carts.map((cart: CartResponse) => (
                  <Card
                    key={cart.id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      position: 'relative',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 140,
                        objectFit: 'contain',
                        p: 2,
                        bgcolor: 'background.paper',
                        cursor: 'pointer'
                      }}
                      image={`/api/products/${cart.product.id}/image`}
                      alt={`${cart.product.name}`}
                      onClick={() => navigate(`/product/${cart.product.id}`)}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' }
                          }}
                          onClick={() => navigate(`/product/${cart.product.id}`)}
                        >
                          {cart.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Added on: {new Date(cart.created_at).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <TextField
                            type="number"
                            label="Quantity"
                            value={cart.quantity}
                            onChange={(e) => handleQuantityChange(cart.id, e.target.value)}
                            slotProps={{ input: { inputProps: { min: 1 } } }}
                            size="small"
                            sx={{ width: 100 }}
                          />
                          <Typography variant="body1" sx={{ ml: 2 }}>
                            ${cart.total_price}
                          </Typography>
                        </Box>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveFromCart(cart.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Box>
                  </Card>
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

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Subtotal</Typography>
                      <Typography>${total_price.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Shipping</Typography>
                      <Typography>Free</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6">${total_price.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    sx={{ mt: 2 }}
                  >
                    Proceed to Checkout
                  </Button>
                </Paper>
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
                Your cart is empty
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

export default CartPage;
