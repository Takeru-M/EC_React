import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Select,
  MenuItem,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Link as MuiLink,
  Avatar,
  TextField,
  Collapse,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Package, TruckIcon } from 'lucide-react';
import Pagination from '../types/responses/Pagination';
import { Favorite } from '../redux/favorites/type';
import { fetchProduct, setIsLoading } from '../redux/products/productSlice';
import { AppDispatch } from '../redux';
import type { RootState } from '../redux';
import { DEFAULT_OPTION_OF_ITEM_TO_BUY } from '../constants/product';
import { addToCart, addToCartForGuest } from '../redux/carts/cartSlice';
import { addToFavorite, removeFromFavorite, fetchFavorites, addToFavoriteForGuest, removeFromFavoriteForGuest, fetchFavoritesForGuest } from '../redux/favorites/favoriteSlice';
import { getReviewsWithUserNames, createReview } from '../redux/reviews/reviewSlice';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';
import LoadingScreen from '../components/Common/Loading';
import ErrorPage from '../views/Common/ErrorPage';

// Mock data for demonstration
const PRODUCT = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday gear in the main compartment, and your water bottle in the side pocket. The padded back panel and adjustable shoulder straps make it comfortable to carry, while the water-resistant material keeps your belongings dry.",
  category: "men's clothing",
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  author: "John Doe",
  stock: 10,
  rating: { rate: 4.5, count: 120 },
  features: [
    "15-inch laptop sleeve",
    "Water-resistant material",
    "Adjustable shoulder straps",
    "Multiple compartments",
    "Side water bottle pocket"
  ],
  stockStatus: "In Stock",
  brand: "Fjallraven",
  additionalImages: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};

const ProductDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(PRODUCT.image);
  const user_id = useSelector((state: RootState) => state.user.user?.id);
  const product = useSelector((state: RootState) => state.product.product);
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const stockOfProduct = Array.from({length: product?.stock ?? 0}, (_, i) => i + 1);
  const reviews = useSelector((state: RootState) => state.review.reviews_for_display);
  const isLoading = useSelector((state: RootState) => state.product.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(fetchProduct({id: Number(id)}))
    .unwrap()
    .finally(() => {
      requestAnimationFrame(() => {
        dispatch(setIsLoading(false));
      });
    });
  }, [id]);

  useEffect(() => {
    if (user_id) {
      dispatch(fetchFavorites({user_id: user_id, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    } else {
      dispatch(fetchFavoritesForGuest({page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    }
  }, []);

  useEffect(() => {
    dispatch(getReviewsWithUserNames({product_id: Number(id)}));
  }, []);

  const addCart = () => {
    if (product && user_id) {
      try {
        dispatch(addToCart({user_id: user_id, product_id: product.id, quantity: quantity}));
        toast.success('Add to cart successfully');
      } catch (error) {
        toast.error('Failed to add to cart');
      }
    } else if (product) {
      try {
        dispatch(addToCartForGuest({product_id: product.id, quantity: quantity}));
        toast.success('Add to cart successfully');
      } catch (error) {
        toast.error('Failed to add to cart');
      }
    }
  };

  const addFavorite = async() => {
    if (product) {
      setIsFavoriteLoading(true);
      try {
        if (user_id) {
          await dispatch(addToFavorite({ user_id, product_id: product.id })).unwrap();
        } else {
          await dispatch(addToFavoriteForGuest({ product_id: product.id })).unwrap();
        }
      } catch (error) {
        toast.error('Failed to add to favorites');
      } finally {
        setIsFavoriteLoading(false);
      }
    }
  };

  const removeFavorite = async() => {
    const favorite = favorites.find((favorite: Favorite) => favorite.product_id === product?.id);
    if (favorite) {
      setIsFavoriteLoading(true);
      try {
        await dispatch(removeFromFavorite({ favorite_id: favorite.id })).unwrap();
      } catch (error) {
        toast.error('Failed to remove from favorites');
      } finally {
        setIsFavoriteLoading(false);
      }
    }
  };

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user_id) {
      await dispatch(createReview({user_id: user_id, product_id: Number(id), rating: newReview.rating, comment: newReview.comment}));

      setShowSuccess(true);
      setShowReviewForm(false);
      setNewReview({ rating: 0, comment: '' });

      dispatch(getReviewsWithUserNames({ product_id: Number(id) }));
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading product..." />
      ) : (
        product ? (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
              {/* Left Column - Images */}
              <Grid item xs={12} md={3}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={selectedImage}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '500px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  {/* imageを複数登録できるようにする */}
                  <Grid container spacing={1}>
                    {PRODUCT.additionalImages?.map((image, index) => (
                      <Grid item xs={3} key={index}>
                        <Box
                          component="img"
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            border: selectedImage === image ? '2px solid #1976d2' : '2px solid transparent',
                          }}
                          onClick={() => setSelectedImage(image)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              {/* Middle Column - Product Details */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {product.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating.rate} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {product.rating.count} ratings
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      About this item
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {product.description}
                    </Typography>
                    {/* <ul>
                      {PRODUCT.features?.map((feature, index) => (
                        <Typography component="li" key={index} sx={{ mb: 1 }}>
                          {feature}
                        </Typography>
                      ))}
                    </ul> */}
                  </Box>
                </Box>
              </Grid>

              {/* Right Column - Buy Box */}
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${product.price}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Package size={20} />
                    <Typography variant="body1" color="success.main" sx={{ ml: 1 }}>
                      {product.stock ? "In Stock" : "残り" + product.stock + "点"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TruckIcon size={20} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Free Delivery
                    </Typography>
                  </Box>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Qty</InputLabel>
                    <Select
                      value={quantity}
                      label="Qty"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      {product.stock > DEFAULT_OPTION_OF_ITEM_TO_BUY.length ? (
                        DEFAULT_OPTION_OF_ITEM_TO_BUY.map((num: number) => (
                          <MenuItem key={num} value={num}>
                            {num}
                          </MenuItem>
                        ))
                      ) : (
                        stockOfProduct.map((num: number) => (
                          <MenuItem key={num} value={num}>
                            {num}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  {favorites.some((favorite: Favorite) => favorite.product_id === product.id) ? (
                    <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={{ mb: 1 }}
                    startIcon={isFavoriteLoading ? <CircularProgress size={20} color="inherit" /> : <FavoriteIcon sx={{ color: 'red' }} />}
                    onClick={removeFavorite}
                    disabled={isFavoriteLoading}
                  >
                    Remove from Favorite
                  </Button>
                  ) : (
                    <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={{ mb: 1 }}
                    startIcon={isFavoriteLoading ? <CircularProgress size={20} color="inherit" /> : <FavoriteIcon />}
                    onClick={addFavorite}
                    disabled={isFavoriteLoading}
                  >
                    Add to Favorite
                  </Button>
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={() => addCart()}
                  >
                    Add to Cart
                  </Button>
                </Paper>
              </Grid>
            </Grid>

            {/* Reviews Section */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5">
                    Customer Reviews
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    Write a Review
                  </Button>
                </Box>

                {/* <Typography variant="h5" gutterBottom>
                  Customer Reviews
                </Typography> */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating.rate} precision={0.5} readOnly size="large" />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {product.rating.rate} out of 5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Based on {product.rating.count} reviews
                  </Typography>
                </Box>

                {/* Success Alert */}
                <Collapse in={showSuccess}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setShowSuccess(false)}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Your review has been submitted successfully!
                  </Alert>
                </Collapse>

                {/* Review Form */}
                <Collapse in={showReviewForm}>
                  <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                    <form onSubmit={onSubmitReview}>
                      <Typography variant="h6" gutterBottom>
                        Your Review
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          value={newReview.rating}
                          onChange={(_, value) => setNewReview({ ...newReview, rating: value || 0 })}
                          size="large"
                        />
                      </Box>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Write your review"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={!newReview.rating || !newReview.comment}
                        >
                          Submit Review
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  </Paper>
                </Collapse>

                <Divider sx={{ mb: 4 }} />

                {reviews.map((review) => (
                  <Box key={review.id} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {review.user_login_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={review.rating} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {new Date(review.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body1">
                      {review.comment}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Container>
        ) : (
        <ErrorPage title="Product not found" message="The product you are looking for does not exist." />
      ))}
    </>
  );
};

export default ProductDetail;
