import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../store/modules/product';
import axios from 'axios';
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
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Package, TruckIcon } from 'lucide-react';
import Pagination from '../types/responses/Pagination';
import { fetchProduct } from '../redux/products/productSlice';
import { AppDispatch } from '../redux';

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
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(PRODUCT.image);

  const dispatch = useDispatch<AppDispatch>();

  // const handleQuantityChange = (event: any) => {
  //   setQuantity(event.target.value);
  // };

  // const dispatch = useDispatch();
  // const { products, isLoading } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProduct({id: Number(id)}));
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Grid container spacing={4}>
        {/* Left Column - Images */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src={selectedImage}
                alt={PRODUCT.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain'
                }}
              />
            </Box>
            <Grid container spacing={1}>
              {PRODUCT.additionalImages?.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`${PRODUCT.title} view ${index + 1}`}
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
              {PRODUCT.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              by {PRODUCT.brand}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={PRODUCT.rating.rate} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {PRODUCT.rating.count} ratings
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>
                About this item
              </Typography>
              <Typography variant="body1" paragraph>
                {PRODUCT.description}
              </Typography>
              <ul>
                {PRODUCT.features?.map((feature, index) => (
                  <Typography component="li" key={index} sx={{ mb: 1 }}>
                    {feature}
                  </Typography>
                ))}
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Buy Box */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              ${PRODUCT.price.toFixed(2)}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Package size={20} />
              <Typography variant="body1" color="success.main" sx={{ ml: 1 }}>
                {PRODUCT.stockStatus}
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
                // onChange={handleQuantityChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 1 }}
              startIcon={<ShoppingCart />}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              color="warning"
              fullWidth
            >
              Buy Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
