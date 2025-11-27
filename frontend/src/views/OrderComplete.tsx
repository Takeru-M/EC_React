import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Button,
  Stack
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Email as EmailIcon, 
  LocalShipping as LocalShippingIcon, 
  Home as HomeIcon 
} from '@mui/icons-material';
import type { RootState } from '../redux';
import { useSelector } from 'react-redux';

const OrderComplete = () => {
  const user = useSelector((state: RootState) => state.user.user);
  // const guest = useSelector((state: RootState) => state.user.guest);
  const order = useSelector((state: RootState) => state.order.order);

  // In a real application, you would get this data from your state management or URL params
  const orderDetails = {
    orderNumber: '#ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    email: 'customer@example.com',
    items: [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
    ],
    shipping: 4.99,
    total: 114.96,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        {/* Order Confirmation Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Order Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for your purchase. Your order has been received and is being processed.
          </Typography>
        </Box>

        {/* Order Details */}
        <Box sx={{ py: 2, mb: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                Order Number:
                <Typography component="span" variant="body2" fontWeight="medium" sx={{ ml: 1 }}>
                  {orderDetails.orderNumber}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                Date:
                <Typography component="span" variant="body2" fontWeight="medium" sx={{ ml: 1 }}>
                  {orderDetails.date}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                Email:
                <Typography component="span" variant="body2" fontWeight="medium" sx={{ ml: 1 }}>
                  {orderDetails.email}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* What's Next Section */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            What's Next?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex' }}>
                <EmailIcon color="primary" sx={{ mr: 1.5, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Confirmation Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We've sent a confirmation email to {orderDetails.email} with your order details.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex' }}>
                <LocalShippingIcon color="primary" sx={{ mr: 1.5, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Order Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your order is being processed and will be shipped soon.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex' }}>
                <HomeIcon color="primary" sx={{ mr: 1.5, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expected delivery within 3-5 business days.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Action Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
        >
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
            sx={{ minWidth: 200 }}
          >
            Continue Shopping
          </Button>
          <Button 
            component={Link} 
            to="order/history" 
            variant="outlined" 
            color="primary"
            sx={{ minWidth: 200 }}
          >
            View All Orders
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderComplete;
